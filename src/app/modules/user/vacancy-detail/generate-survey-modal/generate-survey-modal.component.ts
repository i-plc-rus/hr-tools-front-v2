import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-generate-survey-modal',
  templateUrl: './generate-survey-modal.component.html',
  styleUrl: './generate-survey-modal.component.scss'
})
export class GenerateSurveyModalComponent implements OnInit{
  @Output() onSubmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() user?: any;

  surveyForm = new FormGroup({
    b2bExperience: new FormControl('', Validators.required),
    itExperience: new FormControl('', Validators.required),
    keySkills: new FormControl('', Validators.required),
    keySkillsToggle: new FormControl(false),
    crmKnowledge: new FormControl('', Validators.required),
    softSkills: new FormControl('', Validators.required),
    softSkillsToggle: new FormControl(false),
  });

  loading = false;

  ngOnInit(): void {
    this.setupFormListeners();
  }

  private setupFormListeners(): void {
    this.surveyForm.controls.keySkillsToggle.valueChanges.subscribe(isToggled => {
      const keySkillsControl = this.surveyForm.controls.keySkills;

      if (isToggled) {
        keySkillsControl.clearValidators();
      } else {
        keySkillsControl.setValidators(Validators.required);
      }

      keySkillsControl.updateValueAndValidity();
    });

    this.surveyForm.controls.softSkillsToggle.valueChanges.subscribe(isToggled => {
      const softSkillsControl = this.surveyForm.controls.softSkills;

      if (isToggled) {
        softSkillsControl.clearValidators();
      } else {
        softSkillsControl.setValidators(Validators.required);
      }

      softSkillsControl.updateValueAndValidity();
    });

    this.surveyForm.controls.itExperience.valueChanges.subscribe(value => {
      this.onSkillsToggleChange(!!this.surveyForm.controls.keySkillsToggle.value);
      this.onSoftSkillsToggleChange(!!this.surveyForm.controls.softSkillsToggle.value);
    });
  }
  onSkillsToggleChange(isToggled: boolean): void {
    const keySkillsControl = this.surveyForm.controls.keySkills;

    if (isToggled) {
      keySkillsControl.clearValidators();
    } else {
      keySkillsControl.setValidators(Validators.required);
    }

    keySkillsControl.updateValueAndValidity();
  }

  onSoftSkillsToggleChange(isToggled: boolean): void {
    const softSkillsControl = this.surveyForm.controls.softSkills;

    if (isToggled) {
      softSkillsControl.clearValidators();
    } else {
      softSkillsControl.setValidators(Validators.required);
    }

    softSkillsControl.updateValueAndValidity();
  }

  submit(): void {
    if (this.surveyForm.valid) {
      console.log('Form values:', this.surveyForm.value);
      this.onSubmit.emit(true);
    } else {
      console.log('Form is invalid!', this.surveyForm);
    }
  }

  cancel(): void {
    console.log('Survey canceled');
  }

  private setLoading(isLoading: boolean): void {
    this.loading = isLoading;
  }
}
