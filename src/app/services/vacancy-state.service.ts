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
  private readonly initialState: VacancyFilterState = {
    search: '',
    author_id: '',
    city_id: '',
    department_id: '',
    favorite: false,
    request_author_id: '',
    request_id: '',
    request_type: undefined,
    selection_type: undefined,
    sort: { created_at_desc: true },
    statuses: [],
    urgency: undefined,
    category: 'all',
    searchCity: '',
    searchAuthor: '',
    searchRequestAuthor: '',
    searchValue: '',
    filterCount: 0,
    isFilterOpen: false,
  };

  private filters: VacancyFilterState = { ...this.initialState };

  constructor() {}

  getFilters(): VacancyFilterState {
    return this.filters;
  }

  setFilters(newFilters: Partial<VacancyFilterState>): void {
    this.filters = { ...this.filters, ...newFilters };
  }

  resetFilters(): void {
    this.filters = { ...this.initialState };
  }
}
