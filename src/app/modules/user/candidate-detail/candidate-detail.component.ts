import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../../../api/Api';
import {ActivatedRoute} from '@angular/router';
import {ApplicantViewExt} from '../../../models/Applicant';
// import {CandidateModalService} from '../../../services/candidate-modal.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrl: './candidate-detail.component.scss',
})
export class CandidateDetailComponent implements OnInit, OnChanges {
  @Input() applicantId: string = '';
  @Output() onClose = new EventEmitter();
  isLoading = false;
  isVacancyCard = false;
  applicant?: ApplicantViewExt;

  form: FormGroup = new FormGroup({
    comment: new FormControl(''),
  });

  constructor(
    // private modalService: CandidateModalService,
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicantId'] && this.applicantId !== '') {
      this.getApplicantById(this.applicantId);
      this.isVacancyCard = true;
    }
  }

  ngOnInit(): void {
    if (this.applicantId === '') {
      this.activatedRoute.params.subscribe(params => {
        this.getApplicantById(params['id']);
      })
    }
  }

  getApplicantById(id: string) {
    this.isLoading = true;
    this.api.v1SpaceApplicantDetail(id, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data)
          this.applicant = new ApplicantViewExt(data.body.data);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  openEditModal() {
    if (!this.applicant) return;
    const id = this.applicant.id;
    // this.modalService.editCandidateModal(this.applicant).subscribe(() =>
    //   this.getApplicantById(id)
    // );
  }

  addTag(tag: string) {
    if (!this.applicant || tag === '') return;
    const id = this.applicant.id;
    this.api.v1SpaceApplicantTagUpdate(id, {tag}).subscribe({
      next: () => {
        this.getApplicantById(id);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  removeTag(tag: string) {
    if (!this.applicant) return;
    const id = this.applicant.id;
    this.api.v1SpaceApplicantTagDelete(id, {tag}).subscribe({
      next: () => {
        this.getApplicantById(id);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  saveComment() {
    if (!this.applicant) return;
    const id = this.applicant.id;
    const comment = this.form.value.comment;
    // this.api.v1SpaceApplicantUpdate(id, {comment}).subscribe({
    //   next: () => {
    //     this.getApplicantById(id);
    //   },
    //   error: (error) => {
    //     console.log(error);
    //   }
    // })
  }

  closeDetail() {
    this.onClose.emit();
  }

  onBack() {
    window.history.back();
  }
}