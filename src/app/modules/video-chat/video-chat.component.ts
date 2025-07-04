import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { CaptureVideoComponent } from './components/capture-video/capture-video.component';
import { CameraComponent } from './components/camera/camera.component';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.scss',
})
export class VideoChatComponent {
  @Input() questionNumber: number = 0;
  public numberBackColor: string = '#F0F4F9';
  isCameraCheck: boolean | undefined = true;

  listenForInterviewStart(event:any) {
    this.isCameraCheck = event;
  }
}
