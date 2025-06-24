import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss',
})
export class CameraComponent implements OnInit {
  cameraAvailable: boolean | undefined;
  micAvailable: boolean | undefined;
  permissionGranted: boolean | undefined;
  errorMessage: string | undefined;
  videoRef: any;



  public videoContraints:MediaStreamConstraints = {
    audio: true,
    video: { width: 720, height: 406, }
  }

  ngOnInit(): void {
    this.videoRef = document.getElementById('camera');
    // this.checkMediaDevices();
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
    if (permission) {
      document.documentElement.style.setProperty('--background-local-color', '#FF3700');
      this.cameraAvailable = false;
      
    } else {
      document.documentElement.style.setProperty('--background-local-color', '#11182630');
      this.cameraAvailable = true;
    }  
    console.log(this.cameraAvailable);
  }

  switchAudio(permission: boolean) {
    if (permission) {
      document.documentElement.style.setProperty('--background-local-color', '#FF3700');
      this.micAvailable = false;
    } else {
      document.documentElement.style.setProperty('--background-local-color', '#11182630');
      this.micAvailable = true;
    }  
    console.log(this.micAvailable);
  }
}
