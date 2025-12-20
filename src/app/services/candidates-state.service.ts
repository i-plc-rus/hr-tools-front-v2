import { Injectable } from '@angular/core';
import { ModelsAddedType, ModelsApAddedPeriodType, ModelsApplicantSource, ModelsApplicantStatus, ModelsGenderType, ModelsRelocationType, ModelsSchedule } from '../api/data-contracts';

export interface CandidatesFilterState {
  added_day: string | null;
  added_period: ModelsApAddedPeriodType | undefined | null;
  added_type: ModelsAddedType | undefined | null;
  age_from: number | null;
  age_to: number | null;
  city: string;
  gender: ModelsGenderType | undefined | null;
  language: string | null;
  relocation: ModelsRelocationType | undefined | null;
  schedule: ModelsSchedule | undefined | null;
  search: string | null;
  source: ModelsApplicantSource | undefined | null;
  stage_name: string | null;
  status: ModelsApplicantStatus | undefined | null;
  tag: string | null;
  total_experience_from: number | null;
  total_experience_to: number | null;
  vacancy_id: string;
  vacancy_name: string | null;

  // Отдельные контролы
  searchVacancy: string | null;
  searchCity: string | null;
  searchValue: string | null;
  filterCount: number;
  isFilterOpen: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class CandidatesStateService {
   private savedFilters: CandidatesFilterState | null = null;
  
  setFilters(state: CandidatesFilterState): void {
    this.savedFilters = { ...state };
  }
  
  getFilters(): CandidatesFilterState | null {
    return this.savedFilters;
  }
}