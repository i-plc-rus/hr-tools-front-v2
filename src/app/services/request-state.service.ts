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
  private savedFilters: RequestFilterState | null = null;

  setFilters(state: RequestFilterState): void {
    this.savedFilters = { ...state };
  }

  getFilters(): RequestFilterState | null {
    return this.savedFilters;
  }
}