import {Component, OnInit} from '@angular/core';
import {ScreenWidthService} from '../../../services/screen-width.service';
import {VacancyRequestView} from '../../../models/VacancyRequest';
import {ApiService} from '../../../api/Api';
import {ModelsVRStatus, VacancyapimodelsVacancyRequestView} from '../../../api/data-contracts';
import {VacancyModalService} from '../../../services/vacancy-modal.service';
import {StatusTag} from '../../../models/StatusTag';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss'
})
export class RequestListComponent implements OnInit {
  // фильтр
  searchValue: string = '';

  // справочники
  statuses: {className: StatusTag; value: ModelsVRStatus}[] = [
    {className: 'info', value: ModelsVRStatus.VRStatusCreated},
    {className: 'warning', value: ModelsVRStatus.VRStatusUnderRevision},
    {className: 'warning', value: ModelsVRStatus.VRStatusUnderAccepted},
    {className: 'success', value: ModelsVRStatus.VRStatusAccepted},
    {className: 'danger', value: ModelsVRStatus.VRStatusCanceled},
    {className: 'danger', value: ModelsVRStatus.VRStatusNotAccepted},
  ];

  // вакансии
  isLoading = false;
  requestList: VacancyRequestView[] = [];

  constructor(
    public screen: ScreenWidthService,
    private modalService: VacancyModalService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.isLoading = true;
    this.api.v1SpaceVacancyRequestListCreate({observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data)
          this.requestList = data.body.data.map((request: VacancyapimodelsVacancyRequestView) => new VacancyRequestView(request));
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.log(error);
      },
    })
  }

  openComment(comment: string) {
    this.modalService.openCommentModal(comment);
  }

  changeStatus(id: string, status: ModelsVRStatus) {
    let observable;
    switch (status) {
      case ModelsVRStatus.VRStatusAccepted:
        observable = this.api.v1SpaceVacancyRequestApproveUpdate(id, {});
        break;
      case ModelsVRStatus.VRStatusNotAccepted:
        observable = this.api.v1SpaceVacancyRequestRejectUpdate(id, {});
        break;
      case ModelsVRStatus.VRStatusCanceled:
        observable = this.api.v1SpaceVacancyRequestCancelUpdate(id, {});
        break;
      case ModelsVRStatus.VRStatusUnderAccepted:
        observable = this.api.v1SpaceVacancyRequestOnApprovalUpdate(id, {});
        break;
      case ModelsVRStatus.VRStatusUnderRevision:
        observable = this.api.v1SpaceVacancyRequestToRevisionUpdate(id, {});
        break;
    }
    console.log(id, status);
    if (observable)
      observable.subscribe({
        next: () => {
          this.getRequests();
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  search() {
  }
}
