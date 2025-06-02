import {ComponentRef, EventEmitter, Injectable} from '@angular/core';
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
import {
  AddMemberModalComponent
} from '../modules/user/profile/company-profile/modals/add-member-modal/add-member-modal.component';
import {SpaceapimodelsSpaceUser} from '../api/data-contracts';
import {
  LicenseExtensionModalComponent
} from '../modules/user/profile/company-profile/modals/license-extension-modal/license-extension-modal.component';
import { GenerateSurveySuccessComponent } from '../modules/user/vacancy-detail/generate-survey-success/generate-survey-success.component';
import { GenetateServeyErrorComponent } from '../modules/user/vacancy-detail/genetate-servey-error/genetate-servey-error.component';


@Injectable({
  providedIn: 'root'
})
export class UsersModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal< AddUserModalComponent | DeleteUserModalComponent | ChangePasswordModalComponent | EditMemberModalComponent >;

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



  /**
   * Создаёт специальный оверлей для модального окна анкеты.
   *
   * Решает проблему когда при открытии модалка сначала появляется в верхнем левом углу,
   * а потом перемещается в центр экрана. Используем noop() вместо block()
   * и добавляем специальный класс для стилизации только этого типа модалки.
   *
   * Был конфлик при позиционировании, при использовании инпутов Материал
   */
  private createSurveyOverlay(overlay: Overlay): OverlayRef {
    return overlay.create({
      hasBackdrop: true,
      backdropClass: 'bg-[var(--overlay)]',
      panelClass: 'survey-modal-overlay', // класс для стилизации
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

  openGenerateSurveyModal(): EventEmitter<any> {
    const portal = new ComponentPortal(GenerateSurveyModalComponent);
    this.overlayRef = this.createSurveyOverlay(this.overlay);

    if (!this.overlayRef) {
      throw new Error('');
    }

    const componentRef: ComponentRef<GenerateSurveyModalComponent> = this.overlayRef.attach(portal);

    setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.updatePosition();
      }
    }, 0);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });

    return componentRef.instance.onSubmit;
  }

  openGenerateSurveySuccessModal(): EventEmitter<boolean> {
    const portal = new ComponentPortal(GenerateSurveySuccessComponent);
    this.overlayRef = this.createSurveyOverlay(this.overlay);

    if (!this.overlayRef) {
      throw new Error('');
    }

    const componentRef: ComponentRef<GenerateSurveySuccessComponent> = this.overlayRef.attach(portal);

    setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.updatePosition();
      }
    }, 0);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });

    return componentRef.instance.onSubmit;
  }

  openGenerateSurveyErrorModal(): EventEmitter<boolean> {
    const portal = new ComponentPortal(GenetateServeyErrorComponent);
    this.overlayRef = this.createSurveyOverlay(this.overlay);

    if (!this.overlayRef) {
      throw new Error('');
    }

    const componentRef: ComponentRef<GenetateServeyErrorComponent> = this.overlayRef.attach(portal);

    setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.updatePosition();
      }
    }, 0);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });

    return componentRef.instance.onSubmit;
  }

  addMemberModal(): EventEmitter<SpaceapimodelsSpaceUser> {
    const portal = new ComponentPortal(AddMemberModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef: ComponentRef<AddMemberModalComponent> = this.overlayRef.attach(portal);

    this.overlayRef.backdropClick().subscribe(() => {
      this.closeModal();
    });

    return componentRef.instance.onSubmit;
  }

  openLicenseExtensionModal(): EventEmitter<any> {
    const portal = new ComponentPortal(LicenseExtensionModalComponent);
    this.overlayRef = this.createOverlay(this.overlay);
    const componentRef = this.overlayRef.attach(portal);

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
