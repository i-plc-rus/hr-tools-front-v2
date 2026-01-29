import {EventEmitter, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import { AgreeModalComponent } from '../modules/servey/video-chat/components/capture-video/agree-modal/agree-modal.component';
import { ConfirmModalComponent } from '../modules/servey/video-chat/components/capture-video/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class SecureModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<AgreeModalComponent | ConfirmModalComponent>;

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

  openAgreeModalComponent(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(AgreeModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
    return componentRef.instance.onSubmit;
  }

  openConfirmModalComponent(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(ConfirmModalComponent);
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