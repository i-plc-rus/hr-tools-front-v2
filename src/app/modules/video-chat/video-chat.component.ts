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
export class VideoChatComponent implements OnInit {
  @Input() questionNumber: number = 0;
  @ViewChild('captureComponent', { static: false }) captureComponent!: CaptureVideoComponent;
  public numberBackColor: string = '#F0F4F9';
  cameraAvailable: boolean | undefined;
  micAvailable: boolean | undefined;

  constructor() {}

  ngOnInit(): void {
    // this.checkMediaDevices()
  }

  captureVideo() {
    this.captureComponent.recordHandlre();
    // this.goToNextQuestion(this.questionNumber + 1);
  }

  listenForCameraSwitch(event:any) {
    this.cameraAvailable = event;
  }

  listenForMicSwitch(event:any) {
    this.micAvailable = event;
  }

  goToNextQuestion(state: number) {
    if (this.questionNumber < 6) {
      this.questionNumber = state;
      document
        .querySelectorAll<HTMLElement>('.numberCircle')
        .forEach((element, index, array) => {
          if (index + 1 === this.questionNumber) {
            element.style.backgroundColor = '#5368A6';
            element.style.color = 'white';
          } else {
            element.style.backgroundColor = '#F0F4F9';
            element.style.color = '#5368A6';
          }
        });
    }
  }
}
