import {EventEmitter, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import { CallHrModalComponent } from '../modules/servey/question-generator/components/call-hr-modal/call-hr-modal.component';
import { FinishComponent } from '../modules/servey/question-generator/components/finish/finish.component';
import { SuccessSendModalComponent } from '../modules/servey/question-generator/components/call-hr-modal/success-send-modal/success-send-modal.component';


@Injectable({
  providedIn: 'root'
})
export class CallHrModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<CallHrModalComponent | FinishComponent | SuccessSendModalComponent>;

  constructor(private overlay: Overlay) { }

  private createOverlay(overlay: Overlay): OverlayRef {
    return overlay.create({
      hasBackdrop: true,
      backdropClass: 'bg-[var(--overlay)]',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

  openCallHrModal(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(CallHrModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
    return componentRef.instance.onSubmit;
  }

  openFinishModal(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(FinishComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
    return componentRef.instance.onSubmit;
  }

  openSuccessModal(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(SuccessSendModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
    return componentRef.instance.onSubmit;
  }

  closeModal() {
    this.overlayRef?.dispose();
    this.portal = undefined;
  }
}