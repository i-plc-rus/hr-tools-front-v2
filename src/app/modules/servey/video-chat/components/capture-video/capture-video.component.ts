import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ApiService } from '../../../../../api/Api';
import {
  SurveyapimodelsVkStep0Question,
  SurveyapimodelsVkStep1SurveyQuestion,
} from '../../../../../api/data-contracts';
import {
  QuestionView,
  VideoQuestionView,
} from '../../../../../models/Questions';
import { SnackBarService } from '../../../../../services/snackbar.service';
import { MediaDevicesService } from '../../../../../services/camera.service';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil, map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
declare var MediaRecorder: any;

@Component({
  selector: 'app-capture-video',
  templateUrl: './capture-video.component.html',
  styleUrl: './capture-video.component.scss',
})
export class CaptureVideoComponent implements OnInit {
  @ViewChild('preview', { static: false }) public previewElement!: ElementRef;
  @ViewChild('recording', { static: false })
  public recordingElement!: ElementRef;
  @Output() isInterviewOver: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Input() childInputId: string | null = null;
  public videoButtonTitle = 'Start';
  public isCapturingVideo: boolean = false;
  public videoContraints = {
    audio: true,
    video: { width: 720, height: 406 },
  };
  public videoFile: File | undefined;
  public questionNumber: number = 1;
  public duration = 300000;
  public durationTimeout: any;
  questionsList: VideoQuestionView[] = [];

  public videoRef: any;
  public recordProgress: any;
  public progressBar: any;
  public percentage: any;

  public display: any;
  public timerInterval: any;
  public timerProgress: any;
  progressValue: number = 0;
  private destroyRef = inject(DestroyRef);
  private destroy$ = new Subject<void>();
  public sending: boolean = false;

  constructor(
    private renderer: Renderer2,
    private api: ApiService,
    private snackBar: SnackBarService,
    private mediaDevicesService: MediaDevicesService
  ) {}

  ngOnInit(): void {
    this.videoRef = document.getElementById('recorder');
    this.recordProgress = document.querySelector('.record-progress');
    this.progressBar = document.querySelector('.record-progress-filled');
    this.getQuestions();
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
  }

  getQuestions() {
    this.api
      .v1PublicSurveyVideoInterviewDetail(this.childInputId!, {
        observe: 'response',
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          if (data.body?.data) {
            this.questionsList = data.body.data.questions.map(
              (question: SurveyapimodelsVkStep1SurveyQuestion) =>
                new VideoQuestionView(question)
            );
            console.log(this.questionsList);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  setupCamera() {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 720, height: 406 },
      })
      .then((stream) => {
        console.log(stream);
        this.videoRef.srcObject = stream;
      });
  }

  recordHandlre(): void {
    if (this.videoButtonTitle === 'Start') {
      this.isCapturingVideo = true;
      this.startRecording();
    } else if (this.videoButtonTitle === 'Stop') {
      this.stop(this.previewElement.nativeElement.srcObject);
    }
  }

  goToNextQuestions() {
    const formData = new FormData();
    formData.append('file', this.videoFile!, this.videoFile!.name);
    this.sending = true;
    this.api
      .v1PublicSurveyUploadAnswerCreate(
        this.childInputId!,
        this.questionsList[this.questionNumber - 1].id!,
        formData as any
      )

      .subscribe({
        next: () => {
          this.videoFile = undefined;
          this.setupCamera();
          this.isCapturingVideo = false;
          this.progressValue = 0;
          clearInterval(this.timerInterval);
          clearInterval(this.timerProgress);
          clearTimeout(this.durationTimeout);
          if (this.questionNumber < this.questionsList.length) {
            this.questionNumber++;
          } else {
            this.isInterviewOver.emit(true);
          }
          this.sending = false;
        },
        error: (error) => {
          let errorMessage = '';
          let errorStatus = JSON.parse(error.message).status;
          if (errorStatus === 0) {
            errorMessage = 'Отсутствует подключение к интернету';
          } else if (errorStatus >= 500 && errorStatus <= 599) {
            if (JSON.parse(error.message).error.message) {
              errorMessage = JSON.parse(error.message).error.message;
            } else {
              errorMessage = 'Что-то пошло не так';
            }
          } else {
            errorMessage = `Что-то пошло не так`;
          }
          this.snackBar.snackBarMessageError(errorMessage);
          this.sending = false;
          return throwError(() => new Error(errorMessage));
        },
      });
  }

  startRecording(): void {
    navigator.mediaDevices
      .getUserMedia(this.videoContraints)
      .then((stream) => {
        this.bindStream(stream);
      })
      .then(() =>
        this.startRecordingVideo(
          this.previewElement.nativeElement.captureStream()
        )
      )
      .then((recordedChunks) => {
        this.recordChunks(recordedChunks);
      });

    this.timer(5);
    this.progressBarPersenagete();

    this.durationTimeout = setTimeout(() => {
      this.stop(this.previewElement.nativeElement.srcObject);
    }, 300000);
  }

  timer(minute: number) {
    // let minute = 1;
    let seconds: number = 5 * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    this.display = '05:00';

    const prefix = minute < 10 ? '0' : '';

    this.timerInterval = setInterval(() => {
      seconds--;
      if (statSec != 0) statSec--;
      else statSec = 59;

      if (statSec < 10) {
        textSec = '0' + statSec;
      } else textSec = statSec;

      this.display = `${prefix}${Math.floor(seconds / 60)}:${textSec}`;

      if (seconds == 0) {
        if (this.timerInterval) {
          clearInterval(this.timerInterval);
        }
      }
    }, 1000);
  }

  progressBarPersenagete() {
    // 5 seconds in milliseconds
    console.log(this.duration);
    const interval = 50; // Update every 50ms for smoother animation
    const steps = this.duration / interval;
    const increment = 100 / steps;

    let currentStep = 0;
    this.timerProgress = setInterval(() => {
      this.progressValue += increment;
      currentStep++;
      this.progressBar.style.width = `${this.progressValue}%`;

      if (currentStep >= steps) {
        this.progressValue = 100; // Ensure it reaches 100%
        if (this.timerProgress) {
          clearInterval(this.timerProgress);
        }
      }
    }, interval);
  }

  bindStream(stream: any) {
    this.previewElement.nativeElement.muted = true;
    this.renderer.setProperty(
      this.previewElement.nativeElement,
      'srcObject',
      stream
    );
    this.previewElement.nativeElement.captureStream =
      this.previewElement.nativeElement.captureStream ||
      this.previewElement.nativeElement.mozCaptureStream;
    return new Promise(
      (resolve) => (this.previewElement.nativeElement.onplaying = resolve)
    );
  }

  // wait(delayInMS: number) {
  //   return new Promise(resolve => setTimeout(resolve, delayInMS));
  // }

  startRecordingVideo(stream: any) {
    this.videoButtonTitle = 'Stop';
    let recorder = new MediaRecorder(stream);
    let data: any = [];

    recorder.ondataavailable = (event: any) => data.push(event.data);
    recorder.start();

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event: any) => reject(event);
    });

    let recorded = () => recorder.state == 'recording' && recorder.stop();

    return Promise.all([stopped, recorded]).then(() => data);
  }

  recordChunks(recordedChunks: any) {
    let recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
    this.renderer.setProperty(
      this.recordingElement.nativeElement,
      'src',
      URL.createObjectURL(recordedBlob)
    );
    this.videoFile = this.blobToFile(recordedBlob, 'user-answer.webm');
  }

  blobToFile = (theBlob: Blob, fileName: string): File => {
    //create a file from blob
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return <File>theBlob;
  };

  stop(stream: any) {
    stream.getTracks().forEach(function (track: any) {
      track.stop();
    });
    this.videoButtonTitle = 'Start';
    this.isCapturingVideo = false;
  }
}
function throwError(arg0: () => Error): any {
  throw new Error('Function not implemented.');
}
