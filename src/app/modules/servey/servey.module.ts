import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServeyComponent } from './servey.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './servey.routes';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { QuestionGeneratorComponent } from './question-generator/question-generator.component';
import { WelcomeComponent } from './question-generator/components/welcome/welcome.component';
import { QuestionsComponent } from './question-generator/components/questions/questions.component';
import { FinishComponent } from './question-generator/components/finish/finish.component';
import { CallHrModalComponent } from './question-generator/components/call-hr-modal/call-hr-modal.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SuccessSendModalComponent } from './question-generator/components/call-hr-modal/success-send-modal/success-send-modal.component';
import { IntegerOnlyDirective } from '../../directives/integer-only.directive';
import { VideoChatComponent } from './video-chat/video-chat.component';
import { CameraComponent } from './video-chat/components/camera/camera.component';
import { CaptureVideoComponent } from './video-chat/components/capture-video/capture-video.component';
import { FinishInterviewComponent } from './video-chat/components/finish-interview/finish-interview.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { SecureTextComponent } from "./video-chat/components/capture-video/secure/secure-text.component";
import { AgreeModalComponent } from './video-chat/components/capture-video/agree-modal/agree-modal.component';
import { ConfirmModalComponent } from './video-chat/components/capture-video/confirm-modal/confirm-modal.component';
import { InterviewFailComponent } from './video-chat/components/interview-fail/interview-fail.component';

@NgModule({
  declarations: [
    ServeyComponent,
    QuestionGeneratorComponent,
    WelcomeComponent,
    QuestionsComponent,
    FinishComponent,
    CallHrModalComponent,
    SuccessSendModalComponent,
    IntegerOnlyDirective,
    VideoChatComponent,
    CameraComponent,
    CaptureVideoComponent,
    FinishInterviewComponent,
    AgreeModalComponent,
    ConfirmModalComponent,
    InterviewFailComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MatIcon,
    MatButton,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatRadioGroup,
    MatRadioButton,
    MatFormField,
    MatLabel,
    MatSlideToggle,
    MatCheckboxModule,
    LoaderComponent,
    LayoutComponent,
    SecureTextComponent
],
})
export class ServeyModule {}
