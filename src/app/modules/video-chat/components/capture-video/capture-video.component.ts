import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
declare var MediaRecorder: any;

@Component({
  selector: 'app-capture-video',
  templateUrl: './capture-video.component.html',
  styleUrl: './capture-video.component.scss'
})
export class CaptureVideoComponent implements OnInit {
  @ViewChild('preview', {static: false}) public previewElement!: ElementRef;
  @ViewChild('recording', {static: false}) public recordingElement!: ElementRef;
  public videoButtonTitle = 'Start';
  public isCapturingVideo: boolean = false;
  public videoContraints = {
    audio: true,
    video: { width: 720, height: 406, }
  }
  public videoFile!: File;
  public questionNumber: number = 1;

  constructor(private renderer: Renderer2) {}

  videoRef: any;

  ngOnInit(): void {
    this.videoRef = document.getElementById('recorder');
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


  goToNextQuestion(state: number) {
    if (this.questionNumber < 6) {
      this.questionNumber = state;
      document
        .querySelectorAll<HTMLElement>('.numberCircle')
        .forEach((element, index, array) => {
          if (index + 1 === this.questionNumber) {
            element.style.backgroundColor = '#5368A6';
            element.style.color = 'white';
          } else {
            element.style.backgroundColor = '#F0F4F9';
            element.style.color = '#5368A6';
          }
        });
    }
  }

  startRecording(): void {
    navigator.mediaDevices.getUserMedia(this.videoContraints).then((stream) => { this.bindStream(stream) })
      .then(() => this.startRecordingVideo(this.previewElement.nativeElement.captureStream()))
      .then((recordedChunks) => { this.recordChunks(recordedChunks) });

    setTimeout(() => {
      this.stop(this.previewElement.nativeElement.srcObject)
    }, 6000);
  }

  bindStream(stream: any) {
    this.previewElement.nativeElement.muted = true;
    this.renderer.setProperty(this.previewElement.nativeElement, 'srcObject', stream);
    this.previewElement.nativeElement.captureStream =
      this.previewElement.nativeElement.captureStream || this.previewElement.nativeElement.mozCaptureStream;
    return new Promise((resolve) => (this.previewElement.nativeElement.onplaying = resolve));
  }

  wait(delayInMS: number) {
    return new Promise(resolve => setTimeout(resolve, delayInMS));
  }

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

    let recorded = this.wait(6000).then(
      () => recorder.state == "recording" && recorder.stop()
    );

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