import { Component, Input, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { CaptureVideoComponent } from './components/capture-video/capture-video.component';


@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.scss',
})
export class VideoChatComponent {
  @Input() questionNumber: number = 0;
  @ViewChild('captureComponent', {static: false}) captureComponent!: CaptureVideoComponent;
  public numberBackColor: string = '#F0F4F9';

  constructor() {}

  captureVideo() {
    this.captureComponent.recordHandlre();
    // this.goToNextQuestion(this.questionNumber + 1);
  }

  goToNextQuestion(state: number) {
    
    if(this.questionNumber < 6) {
      this.questionNumber = state;
      document.querySelectorAll<HTMLElement>('.numberCircle').forEach((element, index, array) => {
          if ((index + 1) === this.questionNumber) {
            element.style.backgroundColor = '#5368A6';
            element.style.color = 'white'
          } else {
            element.style.backgroundColor = '#F0F4F9';
            element.style.color = '#5368A6'
          }
        }
      )
    }
  }
}
