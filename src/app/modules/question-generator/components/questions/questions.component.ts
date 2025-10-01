import { Component, DestroyRef, inject } from '@angular/core';
import { CallHrModalService } from '../../../../services/call-hr-modal.service';
import { ApiService } from '../../../../api/Api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SurveyapimodelsVkStep0Question } from '../../../../api/data-contracts';
import { QuestionView } from '../../../../models/Questions';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {
  constructor(
    private api: ApiService,
    private modalService: CallHrModalService
  ) {}

  ngOnInit(): void {
    this.getQuestions();
  }

  private destroyRef = inject(DestroyRef);

  openCallHrModal() {
    this.modalService.openCallHrModal();
  }

  getQuestions() {
    this.api
      .v1PublicSurveyStep0Detail('f90b3b34-2f73-4ebc-a5dd-286dadd2f030', { observe: 'response' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (data.body?.data) {
            const questions = data.body.data.questions.map((question: SurveyapimodelsVkStep0Question) => new QuestionView(question));
            console.log(questions);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
