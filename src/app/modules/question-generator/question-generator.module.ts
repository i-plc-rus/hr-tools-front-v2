import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionGeneratorComponent } from './question-generator.component';
import { MatIcon } from '@angular/material/icon';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { routes } from './question-generator.routes';
import { MatButton } from '@angular/material/button';
import { QuestionsComponent } from './components/questions/questions.component';
import { MatRadioGroup, MatRadioButton } from "@angular/material/radio";
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { CallHrModalComponent } from './components/call-hr-modal/call-hr-modal.component';



@NgModule({
  declarations: [
    QuestionGeneratorComponent,
    WelcomeComponent,
    QuestionsComponent,
    CallHrModalComponent,
  ],
  imports: [
    CommonModule,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatRadioGroup,
    MatRadioButton,
    MatFormField,
    MatLabel,
    MatSlideToggle
  ]
})
export class QuestionGeneratorModule { }
