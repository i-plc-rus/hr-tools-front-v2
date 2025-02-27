import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingWrapperService} from '../services/loading-wrapper.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrl: './company-profile.component.scss'
})
export class CompanyProfileComponent implements OnInit{
  tabLinks = ['info', 'members', 'integrations', 'directories', 'communications', 'templates'];
  selectedIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute,  public loadingService: LoadingWrapperService) {}

  ngOnInit() {
    this.route.firstChild?.url.subscribe(urlSegments => {
      const path = urlSegments[0]?.path;
      this.selectedIndex = this.tabLinks.indexOf(path);
    });
  }

  onTabChange(index: number) {
    this.router.navigate([this.tabLinks[index]], { relativeTo: this.route });
  }
}
