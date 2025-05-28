import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-generate-survey-success',
  templateUrl: './generate-survey-success.component.html',
  styleUrl: './generate-survey-success.component.scss'
})
export class GenerateSurveySuccessComponent {
  @Input() user?: any;
  onSubmit = new EventEmitter<any>();
    
  
}
