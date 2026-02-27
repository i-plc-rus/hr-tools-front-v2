import { Component, inject, AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../api/Api';
import { SnackBarService } from '../../../../services/snackbar.service';
import { RequestTemplateComponent } from '../../templates/requests-templates/request-template/request-template.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { 
  DictapimodelsCityView,
  DictapimodelsCompanyStructView,
  ModelsUserRole,
  SpaceapimodelsSpaceUser,
  VacancyapimodelsApprovalTaskView,
  VacancyapimodelsVacancyRequestView
} from '../../../../api/data-contracts';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-request-in-approval',
  standalone: true,
  imports: [RequestTemplateComponent, MatButtonModule, CommonModule, MatIcon],
  templateUrl: './request-in-approval.component.html',
  styleUrl: './request-in-approval.component.scss'
})
export class RequestInApprovalComponent implements OnInit, AfterViewInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  private api = inject(ApiService);
  private router = inject(Router);
  private snackBarService = inject(SnackBarService);
  protected requestId!: string | null;
  private destroy$ = new Subject<void>();
  @ViewChild(RequestTemplateComponent) templateComponent!: RequestTemplateComponent;

  // Данные для передачи в дочерний компонент
  vacancyDetails: VacancyapimodelsVacancyRequestView | null = null;
  companyStructure: DictapimodelsCompanyStructView[] = [];
  city: DictapimodelsCityView[] = [];
  user: SpaceapimodelsSpaceUser | null = null;
  users: SpaceapimodelsSpaceUser[] = [];
  commentDisabled: boolean = false;
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

    if (!this.requestId) {
      this.snackBarService.snackBarMessageError('ID заявки не найден');
      return;
    }
  }

  get isLastStep(): boolean {
    return this.templateComponent?.isLastStep ?? false;
  }

  get hasTaskId(): boolean {
    const approvals = this.vacancyDetails?.approval_tasks ?? [];
    const userId = this.user?.id ?? null;
    if (!userId) return false;
    const task = approvals.find((item) => item.assignee_user_id === userId);
    if(!task?.id) {
      this.commentDisabled = true;
    }
    return !!task?.id;
  }

  getTaskId(): string | undefined {
    const approvals = this.vacancyDetails?.approval_tasks ?? [];
    const userId = this.user?.id ?? null;
    if (!userId) {
      this.snackBarService.snackBarMessageError('Пользователь не найден');
      return;
    }
    const currentUserTask = approvals.find((item) => item.assignee_user_id === userId);
    const taskId = currentUserTask?.id;
    if (!taskId) {
      this.snackBarService.snackBarMessageError('Не найдена задача согласования для текущего пользователя');
      return;
    }

    return taskId;
  }

  private ensureRequestId(): boolean {
    if (!this.requestId) {
      this.snackBarService.snackBarMessageError('ID заявки не найден');
      return false;
    }
    return true;
  }

  private ensureReady(): { requestId: string; taskId: string } | null {
    if (!this.ensureRequestId()) return null;
    const taskId = this.getTaskId();
    if (!taskId) return null;
    return { requestId: this.requestId!, taskId };
  }

  private getComment(): string | null {
    const comment = (this.templateComponent?.form?.get('description')?.value ?? '').trim();
    if (!comment) {
      this.snackBarService.snackBarMessageError('Отсутствует комментарий');
      return null;
    }
    return comment;
  }

  rejectClaim(): void {
    const ctx = this.ensureReady();
    if (!ctx) return;
    const comment = this.getComment();
    if (!comment) return;

    this.api.v1SpaceVacancyRequestApprovalsRejectCreate(ctx.requestId, ctx.taskId, { comment })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.snackBarService.snackBarMessageSuccess('Заявка отклонена');
        this.router.navigate(['/user/request/list']);
      },
      error: (err) => {
        const msg = err?.error?.message ?? err?.message ?? 'Ошибка при отклонении';
        this.snackBarService.snackBarMessageError(msg);
      }
    })
  }

  onRevision(): void {
    const ctx = this.ensureReady();
    if (!ctx) return;
    const comment = this.getComment();
    if (!comment) return;

    this.api.v1SpaceVacancyRequestApprovalsRequestChangesCreate(ctx.requestId, ctx.taskId, { comment })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.snackBarService.snackBarMessageSuccess('Заявка отправлена на доработку');
        this.router.navigate(['/user/request/list']);
      },
      error: (err) => {
        const msg = err?.error?.message ?? err?.message ?? 'Ошибка при отклонении';
        this.snackBarService.snackBarMessageError(msg);
      }
    })
  }

  approveClaim(): void {
    const ctx = this.ensureReady();
    if (!ctx) return;

    this.api.v1SpaceVacancyRequestApprovalsApproveCreate(ctx.requestId, ctx.taskId, { observe: 'response' })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: () => {
        this.snackBarService.snackBarMessageSuccess('Заявка согласована');
        this.router.navigate(['/user/request/list']);
      },
      error: (err) => {
        const msg = err?.error?.message ?? err?.message ?? 'Ошибка при согласовании';
        this.snackBarService.snackBarMessageError(msg);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
