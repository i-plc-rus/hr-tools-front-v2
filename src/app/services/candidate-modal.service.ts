import {EventEmitter, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {AddCandidateModalComponent} from '../modules/user/candidate-list/add-candidate-modal/add-candidate-modal.component';
import {RejectCandidateModalComponent} from '../modules/user/candidate-list/reject-candidate-modal/reject-candidate-modal.component';
import {ApplicantView, ApplicantViewExt} from '../models/Applicant';

@Injectable({
  providedIn: 'root'
})
export class CandidateModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<AddCandidateModalComponent | RejectCandidateModalComponent>;

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
    if (componentRef.instance instanceof AddCandidateModalComponent)
      componentRef.instance.applicant = applicant;
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
    return componentRef.instance.onSubmit;
  }

  rejectCandidateModal(applicants: ApplicantView[] | ApplicantViewExt[]): EventEmitter<boolean> {
    this.portal = new ComponentPortal(RejectCandidateModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    if (componentRef.instance instanceof RejectCandidateModalComponent)
      componentRef.instance.applicants = applicants;
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