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
      .addSvgIcon('employees', this.setPath(`${this.svgPath}/ic-employees.svg`))
      .addSvgIcon('search', this.setPath(`${this.svgPath}/ic-search.svg`))
      .addSvgIcon('edit', this.setPath(`${this.svgPath}/ic-edit.svg`))
      .addSvgIcon('delete', this.setPath(`${this.svgPath}/ic-delete.svg`))
  }

  ngOnInit() {
    this.screenWidth.isMobile = window.innerWidth < 768;
  }

  private setPath(url: string): SafeResourceUrl {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
