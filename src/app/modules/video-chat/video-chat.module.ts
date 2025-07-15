import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, RouterOutlet} from '@angular/router';
import {routes} from './video-chat.routes';
import { MatIcon } from '@angular/material/icon';
import { VideoChatComponent } from './video-chat.component';
import { MatButton } from '@angular/material/button';
import { CameraComponent } from './components/camera/camera.component';
import { CaptureVideoComponent } from "./components/capture-video/capture-video.component";
import { FinishComponent } from './components/finish/finish.component';



@NgModule({
  declarations: [
    VideoChatComponent,
    CameraComponent,
    CaptureVideoComponent,
    FinishComponent,
  ],
  imports: [
    CommonModule,
    MatIcon,
    MatButton,
    RouterModule.forChild(routes),
  ],
})
export class VideoChatModule {}
