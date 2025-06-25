import { Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss',
})
export class CameraComponent implements OnInit {
  @ViewChild('preview', {static: false}) public previewElement!: ElementRef;
  @Output() cameraStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() micStatus: EventEmitter<boolean> = new EventEmitter<boolean>();
  cameraAvailable: boolean | undefined;
  micAvailable: boolean | undefined;
  permissionGranted: boolean | undefined;
  errorMessage: string | undefined;
  videoRef: any;

  constructor(private renderer: Renderer2) { }

  public videoContraints:MediaStreamConstraints = {
    audio: true,
    video: { width: 720, height: 406 }
  }

  ngOnInit(): void {
    this.videoRef = document.getElementById('camera');
    this.checkMediaDevices();
  }


  setupCamera() {
    navigator.mediaDevices.getUserMedia(this.videoContraints).then((stream) => {
        console.log(stream);
        this.videoRef.srcObject = stream;
    });
  }

  async checkMediaDevices() {
    this.errorMessage = undefined;
    try {
      // Request access to both video (camera) and audio (microphone)
      this.setupCamera();

      // If successful, permission is granted and devices are available
      this.permissionGranted = true;
      this.cameraAvailable = true;
      this.micAvailable = true;
      this.cameraStatus.emit(true);
      this.micStatus.emit(true);

      // Stop the stream immediately if you only want to check availability
      // stream.getTracks().forEach((track) => track.stop());
    } catch (err: any) {
      this.permissionGranted = false;
      this.cameraAvailable = false;
      this.micAvailable = false;
      this.cameraStatus.emit(false);
      this.micStatus.emit(false);

      if (
        err.name === 'NotAllowedError' ||
        err.name === 'PermissionDeniedError'
      ) {
        this.errorMessage = 'Permission denied for camera/microphone access.';
      } else if (
        err.name === 'NotFoundError' ||
        err.name === 'DevicesNotFoundError'
      ) {
        this.errorMessage = 'No camera or microphone found.';
      } else {
        this.errorMessage = `Error accessing media devices: ${err.message}`;
      }
    }
  }

  switchVideo(permission: boolean) {
    const camera = document.getElementById('camera-switch');
    if (permission) {
      this.renderer.setStyle(camera, 'background-color', '#FF3700');
      this.renderer.setStyle(camera, 'border-color', '#FF3700');
      this.cameraAvailable = false; 
      this.cameraStatus.emit(false);
      this.stopCamera();    
    } else {
      this.renderer.setStyle(camera, 'background-color', '#11182630');
      this.renderer.setStyle(camera, 'border-color', '#FFFFFF60');
      this.cameraAvailable = true;
      this.cameraStatus.emit(true);
      this.setupCamera();
    }  
    console.log(this.cameraAvailable);
  }

  switchAudio(permission: boolean) {
    const mic = document.getElementById('mic-switch');
    if (permission) {
      this.renderer.setStyle(mic, 'background-color', '#FF3700');
      this.renderer.setStyle(mic, 'border-color', '#FF3700');
      this.micAvailable = false;
      this.micStatus.emit(false);
    } else {
      this.renderer.setStyle(mic, 'background-color', '#11182630');
      this.renderer.setStyle(mic, 'border-color', '#FFFFFF60');
      this.micAvailable = true;
      this.micStatus.emit(true);
    }  
    console.log(this.micAvailable);
  }

  stopCamera() {
    if (this.previewElement.nativeElement.srcObject) {
      this.previewElement.nativeElement.srcObject.getVideoTracks().forEach(function(track: any) {
      track.stop();
    });
      this.previewElement.nativeElement.srcObject = null; // Clear the stream reference
    }
  }
}
