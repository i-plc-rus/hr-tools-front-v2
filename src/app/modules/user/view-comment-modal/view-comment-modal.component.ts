import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { VacancyModalService } from '../../../services/vacancy-modal.service';
import { VacancyapimodelsCommentView } from '../../../api/data-contracts';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../../api/Api';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { SnackBarService } from '../../../services/snackbar.service';

@Component({
  selector: 'app-view-comment-modal',
  templateUrl: './view-comment-modal.component.html',
  styleUrl: './view-comment-modal.component.scss',
})
export class ViewCommentModalComponent implements OnInit {
  @Input() vacancyId?: string;
  @Input() isRequest?: boolean;
  commentsById?: VacancyapimodelsCommentView[];
  newCommentOpened = true;
  count: boolean[] = [];
  commentForm = new FormGroup({
    author_id: new FormControl('', { nonNullable: true }),
    comment: new FormControl(''),
    date: new FormControl('', { nonNullable: true }),
  });
  confirmDisabled: boolean = true;
  private destroy$ = new Subject<void>();
  userId = localStorage.getItem('userId') || '';

  constructor(
    private api: ApiService,
    private modalService: VacancyModalService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    
    if (!this.isRequest) 
      this.getVacancyById(this.vacancyId!);
    else
      this.getRequestById(this.vacancyId!)
    this.setCommentListener();
  }

  getVacancyById(id: string) {
    this.api.v1SpaceVacancyDetail(id, { observe: 'response' }).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.commentsById = data.body.data.comments;
          for (var item in this.commentsById) {
            this.count.push(false);
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getRequestById(id: string) {
    this.api.v1SpaceVacancyRequestDetail(id, { observe: 'response' }).subscribe({
      next: (data) => {
        if (data.body?.data) {
          this.commentsById = data.body.data.comments;
          for (var item in this.commentsById) {
            this.count.push(false);
          }
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  setCommentListener() {
    this.commentForm.controls.comment.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(300), distinctUntilChanged())
      .subscribe((newValue) => {
        if (newValue !== '') {
          this.confirmDisabled = false;
        } else {
          this.confirmDisabled = true;
        }
      });
  }

  createComment() {
    const currentDate = new Date();
    const newComment: VacancyapimodelsCommentView = {
      author_id: this.userId,
      comment: this.commentForm.controls.comment.value || undefined,
      date: currentDate.toISOString(),
    };

    if (!this.isRequest) {
      this.api
        .v1SpaceVacancyCommentCreate(this.vacancyId!, newComment)
        .subscribe({
          next: () => {
            this.snackBar.snackBarMessageSuccess('Комментарий отправлен');
            this.modalService.closeModal();
          },
          error: (error) => {
            const errorMessage: string = JSON.parse(error.message).error.message;
            console.log(errorMessage);
            this.snackBar.snackBarMessageError(errorMessage);
          },
        });
    }
    
    else {
      this.api
        .v1SpaceVacancyRequestCommentCreate(this.vacancyId!, newComment)
        .subscribe({
          next: () => {
            this.snackBar.snackBarMessageSuccess('Комментарий отправлен');
            this.modalService.closeModal();
          },
          error: (error) => {
            const errorMessage: string = JSON.parse(error.message).error.message;
            console.log(errorMessage);
            this.snackBar.snackBarMessageError(errorMessage);
          },
      });
    }
  }

  openCommentByIndex(index: number) {
    if (index === -1) {
      this.count.fill(false);
      this.newCommentOpened = true;
    } else {
      this.newCommentOpened = false;
      for (let i = 0; i < this.count.length; i++) {
        if (i === index) {
          this.count[i] = true;
        } else {
          this.count[i] = false;
        }
      }
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }
}
