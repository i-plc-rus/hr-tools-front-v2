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
  private readonly initialState: CandidatesFilterState = {
    added_day: '',
      added_period: undefined,
      added_type: undefined,
      age_from: null,
      age_to: null,
      city: '',
      gender: undefined,
      language: '',
      relocation: undefined,
      schedule: undefined,
      search: '',
      source: undefined,
      stage_name: '',
      status: undefined,
      tag: '',
      total_experience_from: null,
      total_experience_to: null,
      vacancy_id: '',
      vacancy_name: '',
      searchVacancy: '',
      searchCity: '',
      searchValue: '',
      filterCount: 0,
      isFilterOpen: false,
  };

  private filters: CandidatesFilterState = { ...this.initialState };

  constructor() { }

  getFilters(): CandidatesFilterState {
    return this.filters;
  }

  setFilters(newFilters: Partial<CandidatesFilterState>): void {
    // Используем Partial для возможности обновления части полей
    this.filters = { ...this.filters, ...newFilters };
  }

  // Метод для сброса фильтров к исходному состоянию
  resetFilters(): void {
    this.filters = { ...this.initialState };
  }
}