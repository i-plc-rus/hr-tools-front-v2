import { Injectable } from '@angular/core';
import {
  ModelsVacancyStatus,
  ModelsVRSelectionType,
  ModelsVRType,
  ModelsVRUrgency,
  VacancyapimodelsVacancySort,
} from '../api/data-contracts';

export interface VacancyFilterState {
  search: string | null;
  author_id: string;
  city_id: string;
  department_id: string | null;
  favorite: boolean | null;
  request_author_id: string;
  request_id: string | null;
  request_type: ModelsVRType | undefined | null;
  selection_type: ModelsVRSelectionType | undefined | null;
  sort: VacancyapimodelsVacancySort;
  statuses: ModelsVacancyStatus[] | null;
  urgency: ModelsVRUrgency | undefined | null;
  category: 'all' | 'favorites' | 'my' | null;
  searchCity: string | null;
  searchAuthor: string | null;
  searchRequestAuthor: string | null;
  searchValue: string | null;
  filterCount: number;
  isFilterOpen: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class VacancyStateService {
  private savedFilters: VacancyFilterState | null = null;

  setFilters(state: VacancyFilterState): void {
    this.savedFilters = { ...state };
  }

  getFilters(): VacancyFilterState | null {
    return this.savedFilters;
  }
}
