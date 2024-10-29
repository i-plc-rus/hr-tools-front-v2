import {EventEmitter, Injectable} from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {AddUserModalComponent} from '../modules/admin/users/add-user-modal/add-user-modal.component';
import {DeleteUserModalComponent} from '../modules/admin/users/delete-user-modal/delete-user-modal.component';
import {Observable} from 'rxjs';
import {ModelsUserRole} from '../api/data-contracts';
import {User} from '../modules/admin/models/User';

@Injectable({
  providedIn: 'root'
})
export class AdminModalService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<AddUserModalComponent | DeleteUserModalComponent>;

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

  closeModal() {
    this.overlayRef?.dispose();
    this.portal = undefined;
  }

  getUsers() {
    const usersList: User[] = [
      new User({
        id: '1',
        first_name: 'Павел',
        last_name: 'Переходов',
        password: '12345678',
        email: 'p4hJG@example.com',
        phone_number: '89999999999',
        role: ModelsUserRole.UserRoleAdmin,
        is_active: true,
      }),
      new User({
        id: '2',
        first_name: 'Аркадий',
        last_name: 'Семенов',
        password: '12345',
        email: 'p4hJG@example.com',
        phone_number: '89999999999',
        role: ModelsUserRole.UserRoleAdmin,
        is_active: true,
      }),
      new User({
        id: '3',
        first_name: 'Константин',
        last_name: 'Константинопольский',
        password: '12345',
        email: 'p4hJG@example.com',
        phone_number: '89999999999',
        role: ModelsUserRole.UserRoleSuperAdmin,
        is_active: true,
      }),
      new User({
        id: '4',
        first_name: 'Петр',
        last_name: 'Пушной',
        password: '12345',
        email: 'p4hJG@example.com',
        phone_number: '89999999999',
        role: ModelsUserRole.UserRoleManager,
        is_active: true,
      }),
      new User({
        id: '5',
        first_name: 'Максим',
        last_name: 'Сказочный',
        password: '12345',
        email: 'p4hJG@example.com',
        phone_number: '89999999999',
        role: ModelsUserRole.UserRoleManager,
        is_active: true,
      }),
      new User({
        id: '6',
        first_name: 'Максим',
        last_name: 'Лупишкин',
        password: '12345',
        email: 'p4hJG@example.com',
        phone_number: '89999999999',
        role: ModelsUserRole.UserRoleManager,
        is_active: false,
      }),
      new User({
        id: '7',
        first_name: 'Сергей',
        last_name: 'Черепашкин',
        password: '12345',
        email: 'p4hJG@example.com',
        phone_number: '89999999999',
        role: ModelsUserRole.UserRoleManager,
        is_active: true,
      }),
      new User({
        id: '8',
        first_name: 'Карсен',
        last_name: 'Пустовалов',
        password: '12345',
        email: 'p4hJG@example.com',
        phone_number: '89999999999',
        role: ModelsUserRole.UserRoleUser,
        is_active: true,
      }),

    ]
    return new Observable<User[]>((observer) => {
      setTimeout(() => {
        observer.next(usersList);
        observer.complete();
      }, 1000)
    })
  }
}
