import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})
export class UserProfileComponent implements OnInit{
  tabLinks = ['account', 'external-accounts', 'notifications', 'templates', 'interface-settings'];
  selectedIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // активный таб из маршрута
    this.route.firstChild?.url.subscribe(urlSegments => {
      const path = urlSegments[0]?.path;
      this.selectedIndex = this.tabLinks.indexOf(path);
    });
  }

  onTabChange(index: number) {
    this.router.navigate([this.tabLinks[index]], { relativeTo: this.route });
  }
}
