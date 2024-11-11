import {Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ViewCommentModalComponent} from '../modules/user/view-comment-modal/view-comment-modal.component';

@Injectable({
  providedIn: 'root'
})
export class VacancyModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<ViewCommentModalComponent>;

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

  openCommentModal(comment: string) {
    this.portal = new ComponentPortal(ViewCommentModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    componentRef.instance.comment = comment;
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
  }

  closeModal() {
    this.overlayRef?.dispose();
    this.portal = undefined;
  }
}
