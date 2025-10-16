import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaDevicesService {
  private hasCameraSubject = new BehaviorSubject<boolean>(false);
  hasCamera$ = this.hasCameraSubject.asObservable();
  private hasMicrophoneSubject = new BehaviorSubject<boolean>(false);
  hasMicrophone$ = this.hasMicrophoneSubject.asObservable();

  constructor(private ngZone: NgZone) {
    if (navigator.mediaDevices) {
      this.monitorDevices();
    }
  }

  private monitorDevices(): void {
    // Check initial device status
    this.updateDeviceStatus();

    // Listen for real-time device changes
    this.ngZone.runOutsideAngular(() => {
      fromEvent(navigator.mediaDevices, 'devicechange')
        .pipe(startWith(null)) // Trigger an initial check
        .subscribe(() => {
          // Re-enter Angular zone to update the UI
          this.ngZone.run(() => {
            this.updateDeviceStatus();
          });
        });
    });
  }

  private updateDeviceStatus(): void {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        const hasMicrophone = devices.some(device => device.kind === 'audioinput');
        
        this.hasCameraSubject.next(hasCamera);
        this.hasMicrophoneSubject.next(hasMicrophone);
      })
      .catch(err => {
        console.error('Error enumerating media devices:', err);
        this.hasCameraSubject.next(false);
        this.hasMicrophoneSubject.next(false);
      });
  }
}