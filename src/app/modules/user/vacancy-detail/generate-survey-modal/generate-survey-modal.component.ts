import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-generate-survey-modal',
  templateUrl: './generate-survey-modal.component.html',
  styleUrl: './generate-survey-modal.component.scss'
})
export class GenerateSurveyModalComponent {
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() user?: any;

  surveyForm: FormGroup;
  skillsToggle = false;
  softSkillsToggle = false;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      b2bExperience: [''],
      itExperience: [''],
      keySkills: [''],
      crmKnowledge: [''],
      softSkills: [''],
      clientSources: [''],
      additionalQuestions: ['']
    });
  }

  ngOnInit(): void {
    this.loadSurveyData();
  }

  private loadSurveyData(): void {
    this.setLoading(true);
    // this.api.getSurveyData().subscribe({
    //   next: (response) => this.handleSurveyResponse(response),
    //   error: (err) => this.handleError(err, 'Ошибка загрузки анкеты')
    // });
    this.setLoading(false);
  }

  submit(): void {
    if (this.surveyForm.valid) {
      this.setLoading(true);
      // this.api.submitSurvey(this.surveyForm.value).subscribe({
      //   next: () => this.handleSuccess('Анкета успешно отправлена'),
      //   error: (err) => this.handleError(err, 'Ошибка при отправке анкеты')
      // });
      this.setLoading(false);
    } else {
      this.handleError('','')
    }
  }

  cancel(): void {
    console.log('Отмена анкеты');
  }

  private handleSurveyResponse(response: HttpResponse<any>): void {
    if (response.body) {
      this.surveyForm.patchValue(response.body);
    }
    this.setLoading(false);
  }

  private handleSuccessfulAction(message: string): void {
    this.setLoading(false);
    console.log(message);
  }

  private handleError(error: any, message: string): void {
    this.setLoading(false);
    console.error(message, error);
  }

  private setLoading(isLoading: boolean): void {
    this.loading = isLoading;
  }
}
