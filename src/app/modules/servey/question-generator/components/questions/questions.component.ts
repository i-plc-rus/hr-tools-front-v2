import { Component, DestroyRef, inject, Input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { QuestionView } from '../../../../../models/Questions';
import { ApiService } from '../../../../../api/Api';
import { CallHrModalService } from '../../../../../services/call-hr-modal.service';
import {
  SurveyapimodelsApplicantSurveyAnswer,
  SurveyapimodelsVkStep0Question,
  SurveyapimodelsVkStep0SurveyView,
} from '../../../../../api/data-contracts';
import { SnackBarService } from '../../../../../services/snackbar.service';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.scss',
})
export class QuestionsComponent {
  @Input() childInputId: string | null = null;
  questionsList: QuestionView[] = [];
  questionIndex: number = 0;
  questionText: string = '';
  resultChecked: boolean = false;
  isLoading = false;
  tempAnswer: string = '';
  myAnswers: SurveyapimodelsApplicantSurveyAnswer[] = [];
  selectedOption: string | null = null;

  constructor(
    private api: ApiService,
    private modalService: CallHrModalService,
    private snackBar: SnackBarService
  ) {}

  ngOnInit(): void {
    console.log('Child Component received ID:', this.childInputId);
    this.getQuestions();
  }

  private destroyRef = inject(DestroyRef);

  openCallHrModal() {
    this.modalService.openCallHrModal();
  }

  getQuestions() {
    this.isLoading = true;
    this.api
      .v1PublicSurveyStep0Detail(this.childInputId!, { observe: 'response' })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (data.body?.data) {
            this.questionsList = data.body.data.questions.map(
              (question: SurveyapimodelsVkStep0Question) =>
                new QuestionView(question)
            );
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error);
          this.isLoading = false;
        },
      });
  }

  onValueChange(event: any) {
    if (event instanceof MatRadioChange) {
      this.tempAnswer = event.value;
      this.resultChecked = true;
    } else {
      this.tempAnswer = event;
      if (event) {
        this.resultChecked = true;
      } else {
        this.resultChecked = false;
      }
    }
  }

  nextQuestion(answer: string, questionId: string) {
    if (this.questionIndex < this.questionsList.length - 1) {
      this.questionIndex++;
      const newAnswer: SurveyapimodelsApplicantSurveyAnswer = {
        answer: answer,
        question_id: questionId,
      };
      this.myAnswers.push(newAnswer);
      this.resultChecked = false;
      this.selectedOption = null;
    } else if (this.questionIndex === this.questionsList.length - 1) {
      if (this.myAnswers.length !== this.questionsList.length) {
        const newAnswer: SurveyapimodelsApplicantSurveyAnswer = {
          answer: answer,
          question_id: questionId,
        };
        this.myAnswers.push(newAnswer);
      }
      console.log(this.myAnswers);
      this.api
        .v1PublicSurveyStep0Update(this.childInputId!, { answers: this.myAnswers })
        .subscribe({
          next: () => {
            this.resultChecked = false;
            this.selectedOption = null;
            this.modalService.openFinishModal();
          },
          error: (error) => {
            const errorMessage: string = JSON.parse(error.message).error
              .message;
            console.log(errorMessage);
            this.snackBar.snackBarMessageError(errorMessage);
            this.resultChecked = false;
          },
        });
    }
  }

  // previousQuestion() {
  //   if (this.questionIndex !== 0) {
  //     this.questionIndex--;
  //   }
  // }
}
