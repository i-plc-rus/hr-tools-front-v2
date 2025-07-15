import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss',
})
export class CameraComponent implements OnInit, OnDestroy  {
  @ViewChild('preview', {static: false}) public previewElement!: ElementRef;
  @Output() isCameraCheck: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  cameraAvailable: boolean | undefined;
  micAvailable: boolean | undefined;
  permissionGranted: boolean | undefined;
  errorMessage: string | undefined;
  videoRef: any;
  // videoStream: any;

  constructor(private renderer: Renderer2) { }

  public videoContraints:MediaStreamConstraints = {
    audio: true,
    video: { width: 720, height: 406 }
  }

  ngOnInit(): void {
    this.videoRef = document.getElementById('camera');
    this.checkMediaDevices();
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  startInterview() {
    this.isCameraCheck.emit(false);
  }

  setupCamera() {
    navigator.mediaDevices.getUserMedia(this.videoContraints).then((stream) => {
        console.log(stream);
        this.videoRef.srcObject = stream;
        // this.videoStream = stream;
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

      // Stop the stream immediately if you only want to check availability
      // stream.getTracks().forEach((track) => track.stop());
    } catch (err: any) {
      this.permissionGranted = false;
      this.cameraAvailable = false;
      this.micAvailable = false;
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
    const videoTrack = this.videoRef.srcObject.getTracks().find((track: { kind: string; }) => track.kind === 'video');
    if (permission) {
      this.renderer.setStyle(camera, 'background-color', '#FF3700');
      this.renderer.setStyle(camera, 'border-color', '#FF3700');
      this.cameraAvailable = false; 
      videoTrack.enabled = false;    
    } else {
      this.renderer.setStyle(camera, 'background-color', '#11182630');
      this.renderer.setStyle(camera, 'border-color', '#FFFFFF60');
      this.cameraAvailable = true;
      videoTrack.enabled = true;
    }  
    console.log(this.cameraAvailable);
  }

  switchAudio(permission: boolean) {
    const mic = document.getElementById('mic-switch');
    const audioTrack = this.videoRef.srcObject.getTracks().find((track: { kind: string; }) => track.kind === 'audio');
    if (permission) {
      this.renderer.setStyle(mic, 'background-color', '#FF3700');
      this.renderer.setStyle(mic, 'border-color', '#FF3700');
      this.micAvailable = false;
      audioTrack.enabled = false;
    } else {
      this.renderer.setStyle(mic, 'background-color', '#11182630');
      this.renderer.setStyle(mic, 'border-color', '#FFFFFF60');
      this.micAvailable = true;
      audioTrack.enabled = true;
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
