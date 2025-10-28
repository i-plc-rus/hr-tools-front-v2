import {
  ModelsEmployment,
  ModelsExperience,
  ModelsSchedule,
  ModelsVRSelectionType, 
  ModelsVRStatus, 
  ModelsVRType, 
  ModelsVRUrgency, 
  VacancyapimodelsApprovalStageView, 
  VacancyapimodelsCommentView, 
  VacancyapimodelsVacancyRequestView
} from '../api/data-contracts';
import {StatusTag} from './StatusTag';

export class VacancyRequestView implements VacancyapimodelsVacancyRequestView {
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
  /** конфиденциальная вакансия */
  confidential: boolean = false;
  creation_date: string = '';
  /** ид подразделения */
  department_id: string = '';
  department_name: string = '';
  /** Коментарий к заявке */
  description: string = '';
  /** Занятость */
  employment?: ModelsEmployment;
  /** Опыт работы */
  experience?: ModelsExperience;
  favorite: boolean = false;
  /** внутреннее взаимодействие */
  in_interaction: string = '';
  /** сотрудник проводящий интервью */
  interviewer: string = '';
  /** ид штатной должности */
  job_title_id: string = '';
  job_title_name: string = '';
  /** кол-во открытых позиций */
  opened_positions: number = 1;
  /** внешнее взаимодействие */
  out_interaction: string = '';
  pinned: boolean = false;
  /** адрес места работы */
  place_of_work: string = '';
  /** требования/обязанности/условия */
  requirements: string = '';
  /** Режим работы */
  schedule?: ModelsSchedule;
  /** краткая информация о комманде отдела */
  short_info: string = '';
  /** название вакансии */
  vacancy_name: string = '';
  approval_stage_current: number = 0;
  approval_stage_is_last: boolean = false;
  approval_stages?: VacancyapimodelsApprovalStageView[];
  /** тип вакансии */
  request_type?: ModelsVRType;
  /** вид подбора */
  selection_type?: ModelsVRSelectionType;
  /** статус */
  status?: ModelsVRStatus;
  /** срочность */
  urgency?: ModelsVRUrgency;
  comments?: VacancyapimodelsCommentView[] | undefined;

  get statusClass(): StatusTag {
    switch (this.status) {
      case ModelsVRStatus.VRStatusCreated:
        return 'info';
      case ModelsVRStatus.VRStatusCanceled:
        return 'danger';
      case ModelsVRStatus.VRStatusNotAccepted:
        return 'danger';
      case ModelsVRStatus.VRStatusAccepted:
        return 'success';
      case ModelsVRStatus.VRStatusUnderRevision:
        return 'warning';
      case ModelsVRStatus.VRStatusUnderAccepted:
        return 'warning';
      default:
        return 'success';
    }
  }

  constructor(vacancyRequest: VacancyapimodelsVacancyRequestView) {
    Object.assign(this, vacancyRequest);
  }
}