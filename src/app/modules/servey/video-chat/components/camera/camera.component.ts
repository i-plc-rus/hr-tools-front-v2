import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MediaDevicesService } from '../../../../../services/camera.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.scss',
})
export class CameraComponent implements OnInit, OnDestroy {
  @ViewChild('preview', { static: false }) public previewElement!: ElementRef;
  @Output() isCameraCheck: EventEmitter<boolean> = new EventEmitter<boolean>(
    true
  );
  @Input() childInputId: string | null = null;
  cameraAvailable: boolean | undefined;
  micAvailable: boolean | undefined;
  errorMessage: string | undefined;
  videoRef: any;
  // videoStream: any;
  hasMicrophone: boolean = false;
  hasCamera: boolean = false;
  canRecordAndUse: boolean = false;
  private destroy$ = new Subject<void>();
  isLoading: boolean = true;

  constructor(
    private renderer: Renderer2,
    private mediaDevicesService: MediaDevicesService
  ) {}

  public videoContraints: MediaStreamConstraints = {
    audio: true,
    video: { width: 720, height: 406 },
  };

  ngOnInit(): void {
    this.videoRef = document.getElementById('camera');

    combineLatest([
      this.mediaDevicesService.hasCamera$,
      this.mediaDevicesService.hasMicrophone$,
    ])
      .pipe(
        takeUntil(this.destroy$),
        map(([hasCam, hasMic]) => hasCam && hasMic)
      )
      .subscribe((canRecordAndUse) => {
        if (canRecordAndUse) {
          this.setupCamera();
        }
      });

    this.mediaDevicesService.hasCamera$
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasCam) => {
        if (this.isLoading) return;
        this.switchVideo(!hasCam);
      });
      
    this.mediaDevicesService.hasMicrophone$
      .pipe(takeUntil(this.destroy$))
      .subscribe((hasMic) => {
        if (this.isLoading) return;
        this.switchAudio(!hasMic);
      });
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  startInterview() {
    this.isCameraCheck.emit(false);
  }

  async checkDevices(): Promise<void> {
    if (this.isLoading) return;
  }

  async setupCamera(): Promise<void> {
    try {
      await navigator.mediaDevices
        .getUserMedia(this.videoContraints)
        .then((stream) => {
          console.log(stream);
          this.videoRef.srcObject = stream;
          this.isLoading = false;
        });
      this.switchVideo(false);
      this.switchAudio(false);
    } catch (err: any) {
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
    const videoTrack = this.videoRef.srcObject
      .getTracks()
      .find((track: { kind: string }) => track.kind === 'video');
    this.cameraAvailable = !permission;
    videoTrack.enabled = !permission;
    if (permission) {
      this.renderer.setStyle(camera, 'background-color', '#FF3700');
      this.renderer.setStyle(camera, 'border-color', '#FF3700');
    } else {
      this.renderer.setStyle(camera, 'background-color', '#11182630');
      this.renderer.setStyle(camera, 'border-color', '#FFFFFF60');
    }
  }

  switchAudio(permission: boolean) {
    const mic = document.getElementById('mic-switch');
    const audioTrack = this.videoRef.srcObject
      .getTracks()
      .find((track: { kind: string }) => track.kind === 'audio');
    this.micAvailable = !permission;
    audioTrack.enabled = !permission;
    if (permission) {
      this.renderer.setStyle(mic, 'background-color', '#FF3700');
      this.renderer.setStyle(mic, 'border-color', '#FF3700');
    } else {
      this.renderer.setStyle(mic, 'background-color', '#11182630');
      this.renderer.setStyle(mic, 'border-color', '#FFFFFF60');
    }
  }

  stopCamera() {
    if (this.previewElement.nativeElement.srcObject) {
      this.previewElement.nativeElement.srcObject
        .getVideoTracks()
        .forEach(function (track: any) {
          track.stop();
        });
      this.previewElement.nativeElement.srcObject = null; // Clear the stream reference
    }
  }
}
