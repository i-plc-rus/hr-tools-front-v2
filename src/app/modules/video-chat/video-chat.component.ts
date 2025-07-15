import { Component } from '@angular/core';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.scss',
})
export class VideoChatComponent {
  isCameraCheck: boolean | undefined = true;
  isInterviewOver: boolean | undefined = false;

  listenForInterviewStart(event:any) {
    this.isCameraCheck = event;
  }

  listenForInterviewOver(event:any) {
    this.isInterviewOver = event;
  }
}
