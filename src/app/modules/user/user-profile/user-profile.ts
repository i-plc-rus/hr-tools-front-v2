import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule, MatFormField } from '@angular/material/form-field';
import { MatInputModule, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatSelect, MatOption } from '@angular/material/select';
import { ApiService } from '../../../api/Api';
import { UsersModalService } from '../../../services/users-modal.service';
import { HttpResponse } from '@angular/common/http';
import { DictapimodelsCompanyView, DictapimodelsJobTitleData, SpaceapimodelsSpaceUser } from '../../../api/data-contracts';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatIcon} from '@angular/material/icon';
import {QuillEditorComponent} from 'ngx-quill';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive, RouterOutlet, MatTab, MatButton, MatTabGroup
  ],
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
