import { Injectable } from '@angular/core';
import {ComponentPortal} from '@angular/cdk/portal';
import {UserMobileMenuComponent} from '../components/user-mobile-menu/user-mobile-menu.component';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {AdminMobileMenuComponent} from '../components/admin-mobile-menu/admin-mobile-menu.component';

@Injectable({
  providedIn: 'root'
})
export class MobileMenuService {
  overlayRef?: OverlayRef;
  portal?: ComponentPortal<UserMobileMenuComponent | AdminMobileMenuComponent>;

  constructor(private overlay: Overlay) { }

  open(admin?: boolean) {
    if (admin) {
      console.log('need to open AdminMobileMenuComponent')
    } else {
      console.log('need to open UserMobileMenuComponent');
      this.portal = new ComponentPortal(UserMobileMenuComponent);
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'bg-[var(--overlay)]',
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy: this.overlay
          .position()
          .global()
          .top('0px')
          .left('0px')
      });
      this.overlayRef.attach(this.portal);
      this.overlayRef.backdropClick().subscribe(() => {
        this.overlayRef?.dispose();
        this.close();
      })
    }
  }

  close() {
    this.portal = undefined;
  }
}
