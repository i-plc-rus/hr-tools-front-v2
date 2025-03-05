import {EventEmitter, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {AddUserModalComponent} from '../modules/user/users-list/add-user-modal/add-user-modal.component';
import {DeleteUserModalComponent} from '../modules/user/users-list/delete-user-modal/delete-user-modal.component';
import {SpaceUser as User} from '../models/SpaceUser';
import {
  ChangePasswordModalComponent
} from '../modules/user/profile/user-profile/change-password-modal/change-password-modal.component';
import {
  EditMemberModalComponent
} from '../modules/user/profile/company-profile/modals/edit-member-modal/edit-member-modal.component';
import {
  GenerateSurveyModalComponent
} from '../modules/user/vacancy-detail/generate-survey-modal/generate-survey-modal.component';


@Injectable({
  providedIn: 'root'
})
export class UsersModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<AddUserModalComponent | DeleteUserModalComponent | ChangePasswordModalComponent | EditMemberModalComponent | GenerateSurveyModalComponent>;

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

  addUserModal(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(AddUserModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
    return componentRef.instance.onSubmit;
  }

  editUserModal(user: User): EventEmitter<boolean> {
    this.portal = new ComponentPortal(AddUserModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    componentRef.instance.user = user;
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
    return componentRef.instance.onSubmit;
  }

  deleteUserModal(user: User): EventEmitter<boolean> {
    this.portal = new ComponentPortal(DeleteUserModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);
    componentRef.instance.user = user;
    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    })
    return componentRef.instance.onSubmit;
  }

  changePasswordModal(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(ChangePasswordModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });

    return componentRef.instance.onSubmit;
  }

  editMemberModal(user: string): EventEmitter<boolean> {
    this.portal = new ComponentPortal(EditMemberModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);

    componentRef.instance.user = user;

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });

    return componentRef.instance.onSubmit;
  }

  openGenerateSurveyModal(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(GenerateSurveyModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });

    return componentRef.instance.onSubmit;
  }

  addMemberModal(): EventEmitter<boolean> {
    this.portal = new ComponentPortal(AddUserModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(this.portal);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });

    return componentRef.instance.onSubmit;
  }


  closeModal() {
    this.overlayRef?.dispose();
    this.portal = undefined;
  }
}
