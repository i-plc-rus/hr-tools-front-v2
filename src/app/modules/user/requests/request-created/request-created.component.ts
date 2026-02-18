import { Component, inject, AfterViewInit, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestTemplateComponent } from '../../templates/requests-templates/request-template/request-template.component';
import { ApiService } from '../../../../api/Api';
import { SnackBarService } from '../../../../services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Subject, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  DictapimodelsCityView,
  DictapimodelsCompanyStructView,
  ModelsUserRole,
  SpaceapimodelsSpaceUser,
  VacancyapimodelsVacancyRequestView
} from '../../../../api/data-contracts';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-request-created',
  standalone: true,
  imports: [RequestTemplateComponent, MatButtonModule, MatDialogModule, CommonModule, MatIcon],
  templateUrl: './request-created.component.html',
  styleUrl: './request-created.component.scss'
})
export class RequestCreatedComponent implements OnInit, AfterViewInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private api = inject(ApiService);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);
  private dialog = inject(MatDialog);
  private destroy$ = new Subject<void>();

  @ViewChild(RequestTemplateComponent) templateComponent!: RequestTemplateComponent;
  @ViewChild('confirmSendDialog') confirmSendDialog!: TemplateRef<any>;
  public requestId!: string | null;
  
  // Данные для передачи в дочерний компонент
  vacancyDetails: VacancyapimodelsVacancyRequestView | null = null;
  companyStructure: DictapimodelsCompanyStructView[] = [];
  city: DictapimodelsCityView[] = [];
  user: SpaceapimodelsSpaceUser | null = null;
  users: SpaceapimodelsSpaceUser[] = [];
  formDisabled: boolean = true;
  isDataLoaded = false;
  readonly ModelsUserRole = ModelsUserRole;
  
  ngOnInit(): void {
    this.requestId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.requestId) {
      this.loadData();
    }
  }

  private loadData(): void {
    forkJoin({
      vacancyDetails: this.api.v1SpaceVacancyRequestDetail(this.requestId!, { observe: 'response' }),
      companyStructure: this.api.v1DictCompanyStructFindCreate({}, { observe: 'response' }),
      city: this.api.v1DictCityFindCreate({}, { observe: 'response' }),
      user: this.api.v1AuthMeList({ observe: 'response' }),
      users: this.api.v1UsersListCreate({
        page: 1,
        limit: 9999,
        sort: { fio_desc: false },
      }, { observe: 'response' })
    }).pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response: any) => {
        this.vacancyDetails = response.vacancyDetails.body?.data || null;
        this.companyStructure = response.companyStructure?.body?.data || [];
        this.city = response.city?.body?.data || [];
        this.user = response.user.body?.data || null;
        this.users = response.users.body?.data || [];
        if (this.user && this.user.role === ModelsUserRole.AdminRole) {
          this.formDisabled = false;
        }
        if (this.user && this.user.id === this.vacancyDetails?.author_id) {
          this.formDisabled = false;
        }
        this.isDataLoaded = true;
      },
      error: (err) => {
        console.error('Ошибка при загрузке данных:', err);
        this.snackBarService.snackBarMessageError('Ошибка при загрузке данных заявки');
      }
    });
  }

  goBack() {
    this.router.navigate(['/user/request/list'])
  }

  ngAfterViewInit(): void {
    if (!this.templateComponent) {
      this.snackBarService.snackBarMessageError('Ошибка загрузки заявки');
      return;
    }

    if (!this.confirmSendDialog) {
      this.snackBarService.snackBarMessageError('Ошибка загрузки модального окна');
      return;
    }

    if (!this.requestId) {
      this.snackBarService.snackBarMessageError('ID заявки не найден');
      return;
    }
  }

  get isLastStep(): boolean {
    return this.templateComponent?.isLastStep ?? false;
  }

  private ensureRequestId(): boolean {
    if (!this.requestId) {
      this.snackBarService.snackBarMessageError('ID заявки не найден');
      return false;
    }
    return true;
  }

  openSendToApprovalConfirm(): void {
    this.dialog.open(this.confirmSendDialog, {
      hasBackdrop: true,
      disableClose: false
    });
  }

  confirmSendToApproval(): void {
    this.closeDialog();
    if (!this.ensureRequestId()) return;

    this.api.v1SpaceVacancyRequestOnApprovalUpdate(this.requestId!, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBarService.snackBarMessageSuccess('Заявка отправлена на согласование');
          this.router.navigate(['/user/request/list']);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || error?.message || 'Ошибка при отправке на согласование';
          this.snackBarService.snackBarMessageError(errorMessage);
        }
      });
  }

  cancelClaim(): void {
    if (!this.ensureRequestId()) return;

    this.api.v1SpaceVacancyRequestCancelUpdate(this.requestId!, {observe: 'response'})
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.snackBarService.snackBarMessageSuccess('Заявка отменена');
        this.router.navigate(['/user/request/list']);
      },
      error: (error) => {
        const errorMessage = error?.error?.message || error?.message || 'Ошибка при отправке на согласование';
        this.snackBarService.snackBarMessageError(errorMessage);
      }
    })
  }

  sendToUpdate(): void {
    if (!this.ensureRequestId()) return;

    if (!this.templateComponent) {
      this.snackBarService.snackBarMessageError('Компонент формы не найден');
      return;
    }

    if (!this.templateComponent.form.valid) {
      this.snackBarService.snackBarMessageError('Не все обязательные поля заполнены');
      return;
    }

    this.updateRequest();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  updateRequest(): void {
    if (!this.ensureRequestId() || !this.templateComponent) return;

    const formData = this.templateComponent.getFormData();

    this.api.v1SpaceVacancyRequestUpdate(this.requestId!, formData, {observe: 'response'})
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.snackBarService.snackBarMessageSuccess('Заявка обновлена');
          this.router.navigate(['/user/request/list']);
        },
        error: (error) => {
          const errorMessage = error?.error?.message || error?.message || 'Ошибка при обновлении заявки';
          this.snackBarService.snackBarMessageError(errorMessage);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
