import { Injectable } from '@angular/core';
import { ModelsVRSelectionType, ModelsVRStatus, VacancyapimodelsSearchPeriod, VacancyapimodelsVrSort } from '../api/data-contracts';

export interface RequestFilterState {
  search: string | null;
  author_id: string | undefined;
  city_id: string | undefined;
  favorite: boolean | null | undefined;
  search_from: string | null;
  search_to: string | null;
  search_period: VacancyapimodelsSearchPeriod | null | undefined;
  selection_type: ModelsVRSelectionType | null | undefined;
  sort: VacancyapimodelsVrSort | undefined;
  statuses: ModelsVRStatus[] | null;
  category: '' | ModelsVRStatus | "favorites" | "Создана" | "На доработке" | "На согласовании" | "Согласована" | "Не согласована" | "Отменена" | null;
  searchValue: string | null;
  searchCity: string | null;
  searchRequestAuthor: string | null;
  filterCount: number;
  isFilterOpen: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RequestStateService {
  private readonly initialState: RequestFilterState = {
    search: '',
    author_id: '',
    city_id: '',
    favorite: undefined,
    search_from: '',
    search_to: '',
    search_period: undefined,
    selection_type: undefined,
    sort: { created_at_desc: true },
    statuses: [],
    category: '',
    searchValue: '',
    searchCity: '',
    searchRequestAuthor: '',
    filterCount: 0,
    isFilterOpen: false,
  };

  private filters: RequestFilterState = { ...this.initialState };

  constructor() { }

  getFilters(): RequestFilterState {
    return this.filters;
  }

  setFilters(newFilters: Partial<RequestFilterState>): void {
    this.filters = { ...this.filters, ...newFilters };
  }

  resetFilters(): void {
    this.filters = { ...this.initialState };
  }
}