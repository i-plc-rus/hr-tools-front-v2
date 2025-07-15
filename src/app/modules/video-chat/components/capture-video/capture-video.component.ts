import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
declare var MediaRecorder: any;


@Component({
  selector: 'app-capture-video',
  templateUrl: './capture-video.component.html',
  styleUrl: './capture-video.component.scss'
})
export class CaptureVideoComponent implements OnInit {
  @ViewChild('preview', {static: false}) public previewElement!: ElementRef;
  @ViewChild('recording', {static: false}) public recordingElement!: ElementRef;
  @Output() isInterviewOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  public videoButtonTitle = 'Start';
  public isCapturingVideo: boolean = false;
  public videoContraints = {
    audio: true,
    video: { width: 720, height: 406, }
  }
  public videoFile: File | undefined;
  public questionNumber: number = 1;
  public duration = 300000;

  constructor(private renderer: Renderer2) {}

  public videoRef: any;
  public recordProgress: any; 
  public progressBar: any; 
  public percentage: any;

  public display:any;
  public timerInterval: any;
  public timerProgress: any;
  progressValue: number = 0;

  ngOnInit(): void {
    this.videoRef = document.getElementById('recorder');
    this.recordProgress = document.querySelector('.record-progress');
    this.progressBar = document.querySelector('.record-progress-filled');
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

  recordHandlre(): void {
    if (this.videoButtonTitle === "Start") {
      this.isCapturingVideo = true;
      this.startRecording();

    } else if (this.videoButtonTitle === "Stop") {
      this.stop(this.previewElement.nativeElement.srcObject);
    }
  }

  goToNextQuestions() {
    this.videoFile = undefined;
    this.setupCamera();
    this.isCapturingVideo = false;
    this.progressValue = 0;
    clearInterval(this.timerInterval);
    clearInterval(this.timerProgress);
    if (this.questionNumber < 15){
      this.questionNumber++;
    } else {
      this.isInterviewOver.emit(true);
    }
    
  }

  startRecording(): void {
    navigator.mediaDevices.getUserMedia(this.videoContraints).then((stream) => { this.bindStream(stream) })
      .then(() => this.startRecordingVideo(this.previewElement.nativeElement.captureStream()))
      .then((recordedChunks) => { this.recordChunks(recordedChunks) });

    this.timer(5);
    this.progressBarPersenagete();

    setTimeout(() => {
      this.stop(this.previewElement.nativeElement.srcObject);
    }, this.duration);
  }


  timer(minute: number) {
    // let minute = 1;
    let seconds: number = minute * 60;
    let textSec: any = '0';
    let statSec: number = 60;

    this.display = '05:00'

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
        console.log('finished');
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  progressBarPersenagete() {
     // 5 seconds in milliseconds
    const interval = 50; // Update every 50ms for smoother animation
    const steps = this.duration / interval;
    const increment = 100 / steps;

    let currentStep = 0;
     this.timerProgress = setInterval(() => {
      this.progressValue += increment;
      currentStep++;
      this.progressBar.style.width = `${this.progressValue}%`

      if (currentStep >= steps) {
        this.progressValue = 100; // Ensure it reaches 100%
        clearInterval(this.timerProgress);
      }
    }, interval);
  }

  bindStream(stream: any) {
    this.previewElement.nativeElement.muted = true;
    this.renderer.setProperty(this.previewElement.nativeElement, 'srcObject', stream);
    this.previewElement.nativeElement.captureStream =
      this.previewElement.nativeElement.captureStream || this.previewElement.nativeElement.mozCaptureStream;
    return new Promise((resolve) => (this.previewElement.nativeElement.onplaying = resolve));
  }

  // wait(delayInMS: number) {
  //   return new Promise(resolve => setTimeout(resolve, delayInMS));
  // }

  startRecordingVideo(stream: any) {

    this.videoButtonTitle = "Stop";
    let recorder = new MediaRecorder(stream);
    let data: any = [];

    recorder.ondataavailable = (event: any) => data.push(event.data);
    recorder.start();

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = (event: any) => reject(event);
    });

    let recorded =
      () => recorder.state == "recording" && recorder.stop();

    return Promise.all([stopped, recorded]).then(() => data);
  }

  recordChunks(recordedChunks: any) {
    let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    this.renderer.setProperty(this.recordingElement.nativeElement, 'src', URL.createObjectURL(recordedBlob));
    this.videoFile = this.blobToFile(recordedBlob, "user-video.mp4");
  }

  blobToFile = (theBlob: Blob, fileName: string): File => {
    //create a file from blob
    var b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;

    return <File>theBlob;
  }


  stop(stream: any) {
    stream.getTracks().forEach(function(track: any) {
      track.stop();
    });
    this.videoButtonTitle = "Start";
    this.isCapturingVideo = false;
  }
}