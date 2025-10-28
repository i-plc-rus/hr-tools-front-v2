import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from 'ag-grid-community';
import {NegotiationView} from '../../models/Negotiation';
import {ApplicantView} from '../../models/Applicant';
import {ApiService} from '../../api/Api';

@Component({
  selector: 'app-cell-candidate-name',
  templateUrl: './cell-candidate-name.component.html',
  styleUrl: './cell-candidate-name.component.scss'
})
export class CellCandidateNameComponent implements ICellRendererAngularComp, OnChanges {
  @Input() photo_url: string = '';
  @Input() fio: string = '';
  @Input() applicantId: string = '';
  photo?: string;
  params?: ICellRendererParams<NegotiationView | ApplicantView>;

  constructor(
    private api: ApiService
  ) { }

  agInit(params: ICellRendererParams<NegotiationView | ApplicantView>): void {
    this.params = params;
    this.fio = params.data?.fio || '';
    if (params.data instanceof NegotiationView) {
      this.photo_url = params.data.photo_url || '';
    }
    else {
      this.applicantId = params.data?.id || '';
      this.getPhoto();
    }
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['applicantId'] && this.applicantId !== '') {
      this.getPhoto();
    }
  }

  getPhoto() {
    this.api.v1SpaceApplicantPhotoList(this.applicantId, {observe: 'response', responseType: 'blob'}).subscribe({
      next: (data: any) => {
        if (data.body && data.body.size > 0) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && e.target.result)
              this.photo = e.target?.result as string;
          }
          reader.readAsDataURL(new Blob([data.body]));
        }
        else
          this.photo = '';
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
