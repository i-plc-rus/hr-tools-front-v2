import {ApplicantapimodelsApplicantDuplicate, ApplicantapimodelsApplicantView, ApplicantapimodelsApplicantViewExt, ApplicantapimodelsApplicantVkSurvey, DbmodelsApplicantParams, ModelsApplicantSource, ModelsApplicantStatus, ModelsGenderType, ModelsRelocationType} from '../api/data-contracts';
import {StatusTag} from './StatusTag';


export class ApplicantView implements ApplicantapimodelsApplicantView {
  /** Дата добавления */
  accept_date: string = '';
  /** Адрес */
  address: string = '';
  /** возраст */
  age: number = 0;
  /** Дата рождения ДД.ММ.ГГГГ */
  birth_date: string = '';
  /** Гражданство */
  citizenship: string = '';
  /** Коментарий */
  comment: string = '';
  /** Емайл */
  email: string = '';
  /** ФИО кандидата */
  fio: string = '';
  /** Имя */
  first_name: string = '';
  /** Пол кандидата */
  gender?: ModelsGenderType;
  /** Идентификатор кандидата */
  id: string = '';
  /** Фамилия */
  last_name: string = '';
  /** Отчество */
  middle_name: string = '';
  /** Дата отклика во внешней системе ДД.ММ.ГГГГ */
  negotiation_date: string = '';
  /** Идентификатор отклика во внешней системе */
  negotiation_id: string = '';
  /** Доподнительные параметры */
  params?: DbmodelsApplicantParams;
  /** Телефон */
  phone: string = '';
  /** Готовность к переезду */
  relocation?: ModelsRelocationType;
  /** Идентификатор резюме во внешней системе */
  resume_id: string = '';
  /** Заголовок резюме */
  resume_title: string = '';
  /** Желаемая ЗП */
  salary: number = 0;
  /** Идентификатор этапа подбора кандидата */
  selection_stage_id: string = '';
  /** Название этапа */
  selection_stage_name: string = '';
  /** Источник кандидата */
  source?: ModelsApplicantSource;
  /** Время на этапе */
  stage_time: string = '';
  /** Дата выхода */
  start_date: string = '';
  /** Статус кандидата */
  status?: ModelsApplicantStatus;
  /** Анкета для кандидата */
  survey?: ApplicantapimodelsApplicantVkSurvey;
  /** Опыт работ в месяцах */
  total_experience: number = 0;
  /** Идентификатор вакансии */
  vacancy_id: string = '';
  /** Название вакансии */
  vacancy_name: string = '';

  get statusClass(): StatusTag {
    switch (this.status) {
      case ModelsApplicantStatus.ApplicantStatusNegotiation:
        return 'info';
      case ModelsApplicantStatus.ApplicantStatusInProcess:
        return 'warning';
      case ModelsApplicantStatus.ApplicantStatusRejected:
        return 'danger';
      case ModelsApplicantStatus.ApplicantStatusArchive:
        return 'default';
      default:
        return 'info';
    }
  }

  constructor(applicant: ApplicantapimodelsApplicantView) {
    Object.assign(this, applicant);
  }
}

export class ApplicantViewExt implements ApplicantapimodelsApplicantViewExt {
    /** Дата добавления */
    accept_date: string = '';
    /** Адрес */
    address: string = '';
    /** возраст */
    age: number = 0;
    /** Дата рождения ДД.ММ.ГГГГ */
    birth_date: string = '';
    /** Гражданство */
    citizenship: string = '';
    /** Коментарий */
    comment: string = '';
    /** Идентификатор кандидатов дубликатов */
    duplicates: string[] = [];
    /** Емайл */
    email: string = '';
    /** ФИО кандидата */
    fio: string = '';
    /** Имя */
    first_name: string = '';
    /** Пол кандидата */
    gender?: ModelsGenderType;
    /** Идентификатор кандидата */
    id: string = '';
    /** Фамилия */
    last_name: string = '';
    /** Отчество */
    middle_name: string = '';
    /** Дата отклика во внешней системе ДД.ММ.ГГГГ */
    negotiation_date: string = '';
    /** Идентификатор отклика во внешней системе */
    negotiation_id: string = '';
    /** Доподнительные параметры */
    params?: DbmodelsApplicantParams;
    /** Телефон */
    phone: string = '';
    /** Возможный дубликат */
    potential_duplicate?: ApplicantapimodelsApplicantDuplicate;
    /** Готовность к переезду */
    relocation?: ModelsRelocationType;
    /** Идентификатор резюме во внешней системе */
    resume_id: string = '';
    /** Заголовок резюме */
    resume_title: string = '';
    /** Желаемая ЗП */
    salary: number = 0;
    /** Идентификатор этапа подбора кандидата */
    selection_stage_id: string = '';
    /** Название этапа */
    selection_stage_name: string = '';
    /** Источник кандидата */
    source?: ModelsApplicantSource;
    /** Время на этапе */
    stage_time: string = '';
    /** Дата выхода */
    start_date: string = '';
    /** Статус кандидата */
    status?: ModelsApplicantStatus;
    /** Анкета для кандидата */
    survey?: ApplicantapimodelsApplicantVkSurvey;
    tags: string[] = [];
    /** Опыт работ в месяцах */
    total_experience: number = 0;
    /** Идентификатор вакансии */
    vacancy_id: string = '';
    /** Название вакансии */
    vacancy_name: string = '';

    get statusClass(): StatusTag {
      switch (this.status) {
        case ModelsApplicantStatus.ApplicantStatusNegotiation:
          return 'info';
        case ModelsApplicantStatus.ApplicantStatusInProcess:
          return 'warning';
        case ModelsApplicantStatus.ApplicantStatusRejected:
          return 'danger';
        case ModelsApplicantStatus.ApplicantStatusArchive:
          return 'default';
        default:
          return 'info';
      }
    }

    constructor(applicant: ApplicantapimodelsApplicantViewExt) {
      Object.assign(this, applicant);
    }
}