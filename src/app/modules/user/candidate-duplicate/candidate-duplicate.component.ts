import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from '../../../api/Api';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicantViewExt} from '../../../models/Applicant';
import {forkJoin} from 'rxjs';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';

type ApplicantFiles = {
  photo?: string;
  resume?: Blob;
}

@Component({
  selector: 'app-candidate-duplicate',
  templateUrl: './candidate-duplicate.component.html',
  styleUrl: './candidate-duplicate.component.scss',
})
export class CandidateDuplicateComponent implements OnInit {
  isLoading = false;
  applicant?: ApplicantViewExt;
  comment = new FormControl('');
  applicantFiles: ApplicantFiles = {};
  resumeUint?: Uint8Array;
  dublicateResumeUint?: Uint8Array;
  duplicateApplicant?: ApplicantViewExt;
  duplicateComment = new FormControl('');
  duplicateApplicantFiles: ApplicantFiles = {};
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getApplicantById(params['id'], params['duplicateId']);
    })
  }

  afterLoadComplete(pdf: PDFDocumentProxy): void {
      let totalHeight = 0;
      const pdfViewer = document.getElementById('pdfViewer');
      for (let i = 1; i <= pdf.numPages; i++) {
        pdf.getPage(i).then(page => {
          const viewport = page.getViewport({ scale: 1.3333333333333333 });
          totalHeight += viewport.height + 10
          if (pdfViewer && i === pdf.numPages) {
            pdfViewer.style.height = `${(totalHeight)}px`;
          }
        });
      }
    }

  getApplicantById(id: string, duplicateId: string) {
    this.resumeUint = undefined;
    this.dublicateResumeUint = undefined;
    this.isLoading = true;
    forkJoin([
      this.api.v1SpaceApplicantDetail(id, {observe: 'response'}),
      this.api.v1SpaceApplicantDetail(duplicateId, {observe: 'response'}),
      this.api.v1SpaceApplicantPhotoList(id, {observe: 'response', responseType: 'blob'}),
      this.api.v1SpaceApplicantPhotoList(duplicateId, {observe: 'response', responseType: 'blob'}),
      this.api.v1SpaceApplicantResumeList(id, {observe: 'response', responseType: 'blob'}),
      this.api.v1SpaceApplicantResumeList(duplicateId, {observe: 'response', responseType: 'blob'})
    ]).subscribe({
      next: async (data) => {
        if (data[0].body?.data) {
          this.applicant = new ApplicantViewExt(data[0].body.data);
          this.comment.setValue(this.applicant.comment);
        }
        if (data[1].body?.data) {
          this.duplicateApplicant = new ApplicantViewExt(data[1].body.data);
          this.duplicateComment.setValue(this.duplicateApplicant.comment);
        }
        if (data[2].body) {
          this.setPhoto(data[2].body, this.applicantFiles);
        }
        if (data[3].body) {
          this.setPhoto(data[3].body, this.duplicateApplicantFiles);
        }
        if (data[4].body) {
          this.setResume(data[4].body, this.applicantFiles);
          if (this.applicantFiles.resume) {
            this.resumeUint = new Uint8Array(await this.applicantFiles.resume.arrayBuffer());
          }
        }
        if (data[5].body) {
          this.setResume(data[5].body, this.duplicateApplicantFiles);
          if (this.duplicateApplicantFiles.resume) {
            this.dublicateResumeUint = new Uint8Array(await this.duplicateApplicantFiles.resume.arrayBuffer());
          }
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    })
  }

  setPhoto(data: Blob, files: ApplicantFiles) {
    if (data.size > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && e.target.result)
          files.photo = e.target?.result as string;
      }
      reader.readAsDataURL(new Blob([data]));
    }
    else
      files.photo = '';
  }

  setResume(data: Blob, files: ApplicantFiles) {
    if (data.size > 0)
      files.resume = data;
    else
      files.resume = undefined;
  }

  isolateProfiles() {
    if (!this.applicant || !this.duplicateApplicant) return;
    this.isLoading = true;
    const id = this.applicant.id;
    const duplicate_id = this.duplicateApplicant.id;
    this.api.v1SpaceApplicantIsolateUpdate(id, {duplicate_id}).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['user', 'candidates', id]);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    })
  }

  mergeProfiles(mainId: string, archiveId: string) {
    if (!mainId || !archiveId) return;
    this.isLoading = true;
    const duplicate_id = archiveId;
    this.api.v1SpaceApplicantJoinUpdate(mainId, {duplicate_id}).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['user', 'candidates', mainId]);
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    })
  }

  onBack() {
    if (!this.applicant)
      window.history.back();
    else
      this.router.navigate(['user', 'candidates', this.applicant.id]);
  }
}