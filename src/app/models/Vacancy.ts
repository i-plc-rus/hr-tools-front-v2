import {
  ModelsEmployment, 
  ModelsExperience, 
  ModelsSchedule, 
  ModelsVacancyStatus, 
  ModelsVRSelectionType, 
  ModelsVRType, 
  ModelsVRUrgency, 
  VacancyapimodelsExternalData, 
  VacancyapimodelsExternalLink, 
  VacancyapimodelsSalary, 
  VacancyapimodelsVacancyView
} from '../api/data-contracts';
import {StatusTag} from './StatusTag';

export class VacancyView implements VacancyapimodelsVacancyView {
  id: string = '';
  /** фио непосредственного руководителя */
  chief_fio: string = '';
  city: string = '';
  /** ид города */
  city_id: string = '';
  /** ид компании */
  company_id: string = '';
  company_name: string = '';
  /** ид структуры компании */
  company_struct_id: string = '';
  company_struct_name: string = '';
  creation_date: string = '';
  /** ид подразделения */
  department_id: string = '';
  department_name: string = '';
  /** ид штатной должности */
  job_title_id: string = '';
  job_title_name: string = '';
  /** кол-во открытых позиций */
  opened_positions: number = 1;
  pinned: boolean = false;
  favorite: boolean = false;
  /** адрес места работы */
  place_of_work: string = '';
  /** требования/обязанности/условия */
  requirements: string = '';
  /** название вакансии */
  vacancy_name: string = '';
  /** ид заявки на вакансию */
  vacancy_request_id: string = '';
  /** Занятость */
  employment?: ModelsEmployment;
  /** Опыт работы */
  experience?: ModelsExperience;
  external?: VacancyapimodelsExternalData;
  hh?: VacancyapimodelsExternalLink;
  /** тип вакансии */
  request_type?: ModelsVRType;
  /** ожидания по зп */
  salary?: VacancyapimodelsSalary;
  /** Режим работы */
  schedule?: ModelsSchedule;
  /** вид подбора */
  selection_type?: ModelsVRSelectionType;
  status?: ModelsVacancyStatus;
  /** срочность */
  urgency?: ModelsVRUrgency;

  get statusClass(): StatusTag {
    switch (this.status) {
      case ModelsVacancyStatus.VacancyStatusOpened:
        return 'success';
      case ModelsVacancyStatus.VacancyStatusSuspended:
        return 'warning';
      case ModelsVacancyStatus.VacancyStatusCanceled:
        return 'danger';
      case ModelsVacancyStatus.VacancyStatusClosed:
        return 'default';
      default:
        return 'success';
    }
  }

  constructor(vacancy: VacancyapimodelsVacancyView) {
    Object.assign(this, vacancy);
  }
}