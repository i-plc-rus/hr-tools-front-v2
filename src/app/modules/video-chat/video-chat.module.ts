import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {routes} from './video-chat.routes';
import { MatIcon } from '@angular/material/icon';
import { VideoChatComponent } from './video-chat.component';
import { MatButton } from '@angular/material/button';
import { CameraComponent } from './components/camera/camera.component';
import { CaptureVideoComponent } from "./components/capture-video/capture-video.component";
// import { FinishComponent } from './components/finish/finish.component';
import { MatRadioGroup, MatRadioButton } from "@angular/material/radio";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatSlideToggle } from "@angular/material/slide-toggle";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VideoChatComponent,
    CameraComponent,
    CaptureVideoComponent,
    // FinishComponent,
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
],
})
export class VideoChatModule {}
