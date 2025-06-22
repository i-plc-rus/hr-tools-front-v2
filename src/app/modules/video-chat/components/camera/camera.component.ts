import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss',
})
export class CameraComponent implements OnInit {
  constructor() {}

  videoRef: any;
  ngOnInit(): void {
    this.videoRef = document.getElementById('camera');
    this.setupCamera();
  }

  setupCamera() {
    navigator.mediaDevices.getUserMedia({
      video: { width: 720, height: 406 },
    }).then((stream) => {
        console.log(stream);
        this.videoRef.srcObject = stream;
    });
  }
}
