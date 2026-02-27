import { Component } from '@angular/core';
import { CaptureVideoComponent } from './components/capture-video/capture-video.component';
import { CameraComponent } from './components/camera/camera.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrl: './video-chat.component.scss',
})
export class VideoChatComponent {
  parentId: string | null = null;
  isCameraCheck: boolean | undefined = true;
  isInterviewOver: boolean | undefined = false;
  isInterviewFail: boolean | undefined = false;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.parentId = params.get('id');
      console.log('Parent ID:', this.parentId);
    });
  }

  listenForInterviewStart(event: any) {
    this.isCameraCheck = event;
  }

  listenForInterviewOver(event: any) {
    this.isInterviewOver = event;
  }

  listenForInterviewFail(event: any) {
    this.isInterviewFail = event;
  }
}
