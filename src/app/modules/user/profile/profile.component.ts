import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { ModelsAddedType, ModelsApAddedPeriodType, ModelsApplicantSource, ModelsApplicantStatus, ModelsGenderType, ModelsRelocationType, ModelsSchedule } from '../../../api/data-contracts';
import {FilterStateService} from './services/filter-state.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  filterStateService = inject(FilterStateService);
  
  constructor(private router: Router) {}
  filterForm = new FormGroup({
    added_day: new FormControl(''),
    added_period: new FormControl<ModelsApAddedPeriodType | undefined>(undefined),
    added_type: new FormControl<ModelsAddedType | undefined>(undefined),
    age_from: new FormControl<number | null>(null),
    age_to: new FormControl<number | null>(null),
    city: new FormControl('', {nonNullable: true}),
    gender: new FormControl<ModelsGenderType | undefined>(undefined),
    language: new FormControl(''),
    relocation: new FormControl<ModelsRelocationType | undefined>(undefined),
    schedule: new FormControl<ModelsSchedule | undefined>(undefined),
    search: new FormControl(''),
    source: new FormControl<ModelsApplicantSource | undefined>(undefined),
    stage_name: new FormControl(''),
    status: new FormControl<ModelsApplicantStatus | undefined>(undefined),
    tag: new FormControl(''),
    total_experience_from: new FormControl<number | null>(null),
    total_experience_to: new FormControl<number | null>(null),
    vacancy_id: new FormControl('', {nonNullable: true}),
    vacancy_name: new FormControl(''),
  });

  isActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  closeFilter(): void {
    this.filterStateService.setFilterOpened(false);
  }
}
