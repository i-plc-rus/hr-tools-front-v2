import {Component, HostListener, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {CdkPortalOutlet} from '@angular/cdk/portal';
import {CdkConnectedOverlay} from '@angular/cdk/overlay';
import {ScreenWidthService} from './services/screen-width.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CdkPortalOutlet,
    CdkConnectedOverlay,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'hr-platform';
  private svgPath: string = 'assets/icons';

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.screenWidth.isMobile = window.innerWidth < 768;
  }

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private screenWidth: ScreenWidthService,
  ) {
    this.matIconRegistry
      .addSvgIcon('add', this.setPath(`${this.svgPath}/ic-add.svg`))
      .addSvgIcon('add-person', this.setPath(`${this.svgPath}/ic-add-person.svg`))
      .addSvgIcon('bag', this.setPath(`${this.svgPath}/ic-bag.svg`))
      .addSvgIcon('calendar', this.setPath(`${this.svgPath}/ic-calendar.svg`))
      .addSvgIcon('note', this.setPath(`${this.svgPath}/ic-note.svg`))
      .addSvgIcon('notifications', this.setPath(`${this.svgPath}/ic-notifications.svg`))
      .addSvgIcon('people', this.setPath(`${this.svgPath}/ic-people.svg`))
      .addSvgIcon('profile', this.setPath(`${this.svgPath}/ic-profile.svg`))
      .addSvgIcon('request', this.setPath(`${this.svgPath}/ic-request.svg`))
      .addSvgIcon('settings', this.setPath(`${this.svgPath}/ic-settings.svg`))
      .addSvgIcon('support', this.setPath(`${this.svgPath}/ic-support.svg`))
      .addSvgIcon('z-arrow', this.setPath(`${this.svgPath}/ic-z-arrow.svg`))
      .addSvgIcon('hr', this.setPath(`${this.svgPath}/ic-hr.svg`))
      .addSvgIcon('error', this.setPath(`${this.svgPath}/ic-error.svg`))
      .addSvgIcon('cross-circle', this.setPath(`${this.svgPath}/ic-cross-circle.svg`))
      .addSvgIcon('green-check', this.setPath(`${this.svgPath}/ic-green-check.svg`))
      .addSvgIcon('employees', this.setPath(`${this.svgPath}/ic-employees.svg`))
      .addSvgIcon('search', this.setPath(`${this.svgPath}/ic-search.svg`))
      .addSvgIcon('edit', this.setPath(`${this.svgPath}/ic-edit.svg`))
      .addSvgIcon('delete', this.setPath(`${this.svgPath}/ic-delete.svg`))
      .addSvgIcon('account-box', this.setPath(`${this.svgPath}/ic-account-box.svg`))
      .addSvgIcon('add-bag', this.setPath(`${this.svgPath}/ic-add-bag.svg`))
      .addSvgIcon('extension', this.setPath(`${this.svgPath}/ic-extension.svg`))
      .addSvgIcon('logout', this.setPath(`${this.svgPath}/ic-logout.svg`))
      .addSvgIcon('business-bag', this.setPath(`${this.svgPath}/ic-business-bag.svg`))
      .addSvgIcon('profile-in-circle', this.setPath(`${this.svgPath}/ic-profile-in-circle.svg`))
      .addSvgIcon('group', this.setPath(`${this.svgPath}/ic-group.svg`))
      .addSvgIcon('pin', this.setPath(`${this.svgPath}/ic-pin.svg`))
      .addSvgIcon('pin-outline', this.setPath(`${this.svgPath}/ic-pin-outline.svg`))
      .addSvgIcon('chat-outline', this.setPath(`${this.svgPath}/ic-chat-outline.svg`))
      .addSvgIcon('avg-pace', this.setPath(`${this.svgPath}/ic-avg-pace.svg`))
      .addSvgIcon('hourglass', this.setPath(`${this.svgPath}/ic-hourglass.svg`))
      .addSvgIcon('block-circle', this.setPath(`${this.svgPath}/ic-block-circle.svg`))
      .addSvgIcon('check-circle', this.setPath(`${this.svgPath}/ic-check-circle.svg`))
      .addSvgIcon('no-avatar', this.setPath(`${this.svgPath}/ic-no-avatar.svg`))
      .addSvgIcon('assignment-ind', this.setPath(`${this.svgPath}/ic-assignment-ind.svg`))
      .addSvgIcon('whatsapp', this.setPath(`${this.svgPath}/ic-whatsapp.svg`))
      .addSvgIcon('telegram', this.setPath(`${this.svgPath}/ic-telegram.svg`))
      .addSvgIcon('call', this.setPath(`${this.svgPath}/ic-call.svg`))
      .addSvgIcon('mail', this.setPath(`${this.svgPath}/ic-mail.svg`))
      .addSvgIcon('share', this.setPath(`${this.svgPath}/ic-share.svg`))
      .addSvgIcon('print', this.setPath(`${this.svgPath}/ic-print.svg`))
      .addSvgIcon('download', this.setPath(`${this.svgPath}/ic-download.svg`))
      .addSvgIcon('ql-stylus-note', this.setPath(`${this.svgPath}/ic-ql-stylus-note.svg`))
      .addSvgIcon('cancel', this.setPath(`${this.svgPath}/ic-cancel.svg`))
      .addSvgIcon('comment', this.setPath(`${this.svgPath}/ic-comment.svg`))
      .addSvgIcon('border-color', this.setPath(`${this.svgPath}/ic-border-color.svg`))
      .addSvgIcon('logo-avito', this.setPath(`${this.svgPath}/ic-logo-avito.svg`))
      .addSvgIcon('logo-hh', this.setPath(`${this.svgPath}/ic-logo-hh.svg`))
      .addSvgIcon('forward', this.setPath(`${this.svgPath}/ic-forward.svg`))
      .addSvgIcon('import_contacts', this.setPath(`${this.svgPath}/ic-import_contacts.svg`))
      .addSvgIcon('alarm-active', this.setPath(`${this.svgPath}/ic-alarm-active.svg`))
      .addSvgIcon('drag-indicator', this.setPath(`${this.svgPath}/ic-drag-indicator.svg`))
      .addSvgIcon('article-shortcut', this.setPath(`${this.svgPath}/ic-article-shortcut.svg`))
      .addSvgIcon('add-a-photo', this.setPath(`${this.svgPath}/ic-add-a-photo.svg`))
      .addSvgIcon('arrow-forward', this.setPath(`${this.svgPath}/ic-arrow-forward.svg`))
      .addSvgIcon('forum', this.setPath(`${this.svgPath}/ic-forum.svg`))
      .addSvgIcon('person', this.setPath(`${this.svgPath}/ic-person.svg`))
      .addSvgIcon('smart-toy', this.setPath(`${this.svgPath}/ic-smart-toy.svg`))
  }

  ngOnInit() {
    this.screenWidth.isMobile = window.innerWidth < 768;
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
