import {EventEmitter, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ViewCommentModalComponent} from '../modules/user/view-comment-modal/view-comment-modal.component';
import {GenerateDescriptionModalComponent} from '../modules/user/generate-description-modal/generate-description-modal.component';
import {FormControl} from '@angular/forms';
import { VacancyapimodelsComment, VacancyapimodelsCommentView } from '../api/data-contracts';

@Injectable({
  providedIn: 'root'
})
export class VacancyModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<ViewCommentModalComponent | GenerateDescriptionModalComponent>;

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

  openCommentModal(vacancyId: string, isRequest: boolean): EventEmitter<VacancyapimodelsCommentView> {
    this.portal = new ComponentPortal(ViewCommentModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    if (componentRef.instance instanceof ViewCommentModalComponent) {
      componentRef.instance.vacancyId = vacancyId;
      componentRef.instance.isRequest = isRequest;
    }      
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });
    return componentRef.instance.onSubmit;
  }

  openGenerateModal(control: FormControl) {
    this.portal = new ComponentPortal(GenerateDescriptionModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    if (componentRef.instance instanceof GenerateDescriptionModalComponent)
      componentRef.instance.control = control;
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
  }

  closeModal() {
    this.overlayRef?.dispose();
    this.portal = undefined;
  }
}
