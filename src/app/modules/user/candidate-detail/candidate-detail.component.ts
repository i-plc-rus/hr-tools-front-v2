import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from '../../../api/Api';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicantViewExt} from '../../../models/Applicant';
import {CandidateModalService} from '../../../services/candidate-modal.service';
import {
  ApplicantapimodelsApplicantHistoryFilter,
  ApplicantapimodelsApplicantHistoryView,
  FilesapimodelsFileView,
  VacancyapimodelsSelectionStageView
} from '../../../api/data-contracts';
import {ApplicantHistoryView} from '../../../models/ApplicantHistory';
import {MatTabGroup} from '@angular/material/tabs';
import {SnackBarService} from '../../../services/snackbar.service';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrl: './candidate-detail.component.scss',
})
export class CandidateDetailComponent implements OnInit,AfterViewInit, OnChanges, OnDestroy {
  @Input() applicantId: string = '';
  @Output() onClose = new EventEmitter();
  isLoading = false;
  isVacancyCard = false;
  applicant?: ApplicantViewExt;
  stages?: VacancyapimodelsSelectionStageView[];
  docList?: FilesapimodelsFileView[];
  photo?: string;
  resume?: File;
  resumeUint?: Uint8Array;
  changesLog?: ApplicantHistoryView[];
  changesCommentsOnly = new FormControl<boolean>(false);
  comment = new FormControl('');
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  selectedTabIndex = 0;

  private tabIndexTimeoutId?: number;
  private printTimeoutId?: number;
  private urlRevokeTimeoutId?: number;

  currentStageOrder = 0;
  constructor(
    private modalService: CandidateModalService,
    private api: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBarService: SnackBarService
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
    this.changesCommentsOnly.valueChanges.subscribe((value) =>
      this.getChangesLog(!!value)
    );
  }

  ngAfterViewInit() {
    this.tabIndexTimeoutId = window.setTimeout(() => {
      if (this.tabGroup) {
        this.tabGroup.selectedIndex = this.selectedTabIndex;
      }
    });
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
  }

  getApplicantById(id: string) {
    this.isLoading = true;
    this.api.v1SpaceApplicantDetail(id, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.currentStageOrder = data.body.data.current_stage_order;
          this.applicant = new ApplicantViewExt(data.body.data);
          this.comment.setValue(this.applicant.comment);
          if (this.applicant.vacancy_id)
            this.getStages(this.applicant.vacancy_id);
          this.getChangesLog(!!this.changesCommentsOnly.value);
          this.getDocList();
          this.getResume();
          this.getPhoto();
        }
        this.isLoading = false;
        this.tabIndexTimeoutId = window.setTimeout(() => {
          if (this.tabGroup) {
            this.tabGroup.selectedIndex = this.selectedTabIndex;
          }
        });
        },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  getResume() {
    if (!this.applicant) return;

    this.resume = undefined;
    this.resumeUint = undefined;

    this.isLoading = true;
    this.api.v1SpaceApplicantResumeDetail(this.applicant.id, {
      observe: 'response',
      responseType: "arraybuffer"
    }).subscribe({
      next: async (data: any) => {
        if (data.body && data.body.byteLength > 0 && data.headers.get('content-type') === 'application/pdf') {
          const blob = new Blob([data.body], { type: 'application/pdf' });

          const contentDisposition = data.headers.get('content-disposition');
          let fileName = 'resume.pdf';
          if (contentDisposition) {
            const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDisposition);
            if (matches?.[1]) {
              const iso = matches[1].replace(/['"]/g, '');
              const bytes = new Uint8Array(iso.length);
              for (let i = 0; i < iso.length; i++) bytes[i] = iso.charCodeAt(i);
              fileName = new TextDecoder('utf-8').decode(bytes);
            }
          }

          this.resume = new File([blob], fileName);
          this.resumeUint = new Uint8Array(await this.resume.arrayBuffer());
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.resume = undefined;
        this.resumeUint = undefined;
        this.isLoading = false;
      },
    });
  }



  getDocList() {
    if (!this.applicant) return;
    this.isLoading = true;
    this.api.v1SpaceApplicantDocListDetail(this.applicant.id, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.docList = data.body.data;
        }
        else
          this.docList = [];
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  getPhoto() {
    if (!this.applicant) return;
    this.api.v1SpaceApplicantPhotoDetail(this.applicant.id, {observe: 'response', responseType: 'blob'}).subscribe({
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

  getChangesLog(comments_only: boolean = false) {
    if (!this.applicant) return;
    const filter = {comments_only} as ApplicantapimodelsApplicantHistoryFilter;
    this.api.v1SpaceApplicantChangesUpdate(this.applicant.id, filter, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          let dataChanges = data.body.data as ApplicantapimodelsApplicantHistoryView[];
          dataChanges = dataChanges.reverse();
          this.changesLog = dataChanges.map((change) => new ApplicantHistoryView(change));
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getStages(vacancyId: string) {
    this.api.v1SpaceVacancyStageListCreate(vacancyId, {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          const dataStages = data.body.data as VacancyapimodelsSelectionStageView[];
          this.stages = dataStages.sort((a, b) => (a.stage_order || 0) - (b.stage_order || 0));
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  changeStage(stage_id?: string) {
    if (!this.applicant || !stage_id) return;
    const id = this.applicant.id;

    const stageName = this.stages?.find(stage => stage.id === stage_id)?.name || '';

    this.api.v1SpaceApplicantChangeStageUpdate(id, { stage_id: stage_id }).subscribe({
      next: () => {
        this.getApplicantById(id);
        this.snackBarService.snackBarMessageSuccess(`Кандидат успешно переведен на этап "${stageName}"`);
        },
      error: (error) => {
        console.log(error);
        this.snackBarService.snackBarMessageError(`Ошибка при переводе кандидата на новый этап`);
      }
    });
  }

  openRejectModal() {
    if (!this.applicant) return;
    const id = this.applicant.id;
    this.modalService.rejectCandidateModal([this.applicant]).subscribe(() =>
      this.getApplicantById(id)
    );
  }

  openCommentModal() {
    if (!this.applicant) return;
    this.modalService.openCommentModal(this.applicant.id).subscribe(() =>
      this.getChangesLog(!!this.changesCommentsOnly.value)
    );
  }

  uploadResume(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length || !this.applicant) return;

    this.isLoading = true;
    const formData = new FormData();
    formData.append("resume", target.files[0], target.files[0].name);
    this.api.v1SpaceApplicantUploadResumeCreate(this.applicant.id, formData as any, {observe: 'response'}).subscribe({
      next: () => {
        this.getResume();
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  printResume() {
    if (!this.resume) return;

    const blob = new Blob([this.resume], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);

    const printWindow = window.open(blobUrl, '_blank');

    if (printWindow) {
      printWindow.addEventListener('load', () => {
        if (this.printTimeoutId) {
          clearTimeout(this.printTimeoutId);
        }
        this.printTimeoutId = window.setTimeout(() => {
          printWindow.print();
        }, 500);
      });

      if (this.urlRevokeTimeoutId) {
        clearTimeout(this.urlRevokeTimeoutId);
      }
      this.urlRevokeTimeoutId = window.setTimeout(() => {
        URL.revokeObjectURL(blobUrl);
      }, 3000);
    }
  }


  downloadResume() {
    if (!this.applicant || !this.resume) return;

    const blob = new Blob([this.resume], {type: 'application/octet-stream'});
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Резюме.pdf';
    link.click();
  }

  deleteResume() {
    if (!this.applicant) return;

    this.isLoading = true;
    this.api.v1SpaceApplicantResumeDelete(this.applicant.id, {observe: 'response'})
      .subscribe({
        next: () => {
          this.resume = undefined;
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
  }

  uploadDocument(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length || !this.applicant) return;

    this.isLoading = true;
    const formData = new FormData();
    formData.append("document", target.files[0], target.files[0].name);
    this.api.v1SpaceApplicantUploadDocCreate(this.applicant.id, formData as any, {observe: 'response'}).subscribe({
      next: () => {
        this.getDocList();
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  downloadDocument(id?: string, name?: string) {
    if (!this.applicant || !id || !name) return;

    this.api.v1SpaceApplicantDocDetail(id, {observe: 'response', responseType: 'blob'}).subscribe({
      next: (data) => {
        if (data.body) {
          const blob = new Blob([data.body], {type: 'application/octet-stream'});
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = name;
          link.click();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  deleteDocument(id?: string) {
    if (!this.applicant || !id) return;

    this.api.v1SpaceApplicantDocDelete(id, {observe: 'response'}).subscribe({
      next: () => {
        this.getDocList();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  saveComment() {
    if (!this.applicant) return;
    const id = this.applicant.id;
    const comment = this.comment.value || '';
    const applicant = {...this.applicant, comment};
    this.isLoading = true;
    this.api.v1SpaceApplicantUpdate(id, applicant).subscribe({
      next: () => {
        this.getApplicantById(id);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

  closeDetail() {
    this.onClose.emit();
  }

  onBack() {
    this.router.navigate(['user', 'candidates', 'list']);
  }
  cleanValue(field: string | undefined, value: string | undefined | null): string {
    if (!field) return 'Не указано поле';
    if (!value) return 'Не было значения';

    if (field === 'Тэги') {
      const cleaned = value.replace(/[\{\}\[\]A:&]/g, '');
      return cleaned || 'Без тегов';
    }

    if (value.includes('<') || value.includes('&nbsp;')) {
      const cleaned = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
      return cleaned || 'Пусто';
    }

    return value;
  }

  isStageDisabled(stage: VacancyapimodelsSelectionStageView): boolean {
    if (!this.applicant?.selection_stage_id || !this.stages?.length) return true;

    const currentStage = this.stages.find(s => s.id === this.applicant!.selection_stage_id);
    if (!currentStage || currentStage.stage_order === undefined) return true;

    return (stage.stage_order ?? 0) <= currentStage.stage_order;
  }



  ngOnDestroy() {
    // Очистка всех таймаутов
    if (this.tabIndexTimeoutId) {
      clearTimeout(this.tabIndexTimeoutId);
    }
    if (this.printTimeoutId) {
      clearTimeout(this.printTimeoutId);
    }
    if (this.urlRevokeTimeoutId) {
      clearTimeout(this.urlRevokeTimeoutId);
    }
  }
}
