import {EventEmitter, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {AddCandidateModalComponent} from '../modules/user/candidate-list/add-candidate-modal/add-candidate-modal.component';
import {ApplicantView, ApplicantViewExt} from '../models/Applicant';

@Injectable({
  providedIn: 'root'
})
export class CandidateModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<AddCandidateModalComponent>;

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

  addCandidateModal(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(AddCandidateModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
    return componentRef.instance.onSubmit;
  }

  editCandidateModal(applicant: ApplicantView | ApplicantViewExt): EventEmitter<boolean> {
    this.portal = new ComponentPortal(AddCandidateModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    componentRef.instance.applicant = applicant;
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