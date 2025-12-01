import {EventEmitter, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ViewCommentModalComponent} from '../modules/user/view-comment-modal/view-comment-modal.component';
import {GenerateDescriptionModalComponent} from '../modules/user/generate-description-modal/generate-description-modal.component';
import {FormControl} from '@angular/forms';
import { VacancyapimodelsComment, VacancyapimodelsCommentView } from '../api/data-contracts';
import { RequestCreateVacancyModalComponent } from '../modules/user/request-create-vacancy-modal/request-create-vacancy-modal.component';

@Injectable({
  providedIn: 'root'
})
export class VacancyModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<ViewCommentModalComponent | GenerateDescriptionModalComponent | RequestCreateVacancyModalComponent>;

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
    let instance: ViewCommentModalComponent;
    if (componentRef.instance instanceof ViewCommentModalComponent) {
      instance = componentRef.instance;
      instance.vacancyId = vacancyId;
      instance.isRequest = isRequest;
    } else {
      throw new Error('Ошибка');
    }
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });
    return instance.onSubmit;
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

  openCreateVacancyModal(
    requestId: string, 
    companyName: string, 
    vacancyName: string,
    companyStructName?: string,
    departmentName?: string,
    jobTitleName?: string,
    showNumber?: boolean
  ): EventEmitter<boolean> {
    this.portal = new ComponentPortal(RequestCreateVacancyModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    let instance: RequestCreateVacancyModalComponent;
    if (componentRef.instance instanceof RequestCreateVacancyModalComponent) {
      instance = componentRef.instance;
      instance.requestId = requestId;
      instance.companyName = companyName;
      instance.vacancyName = vacancyName;
      instance.companyStructName = companyStructName;
      instance.departmentName = departmentName;
      instance.jobTitleName = jobTitleName;
      instance.showNumber = showNumber;
    } else {
      throw new Error('Ошибка');
    }
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });
    return instance.onSubmit;
  }

  closeModal() {
    this.overlayRef?.dispose();
    this.portal = undefined;
  }
}
