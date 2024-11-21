import {DbmodelsApplicantParams, ModelsApplicantSource, ModelsGenderType, ModelsNegotiationStatus, ModelsRelocationType, NegotiationapimodelsNegotiationView} from "../api/data-contracts"
import {StatusTag} from "./StatusTag";
export class NegotiationView implements NegotiationapimodelsNegotiationView {
  id: string = '';
  photo_url: string = '';
  fio: string = '';
  phone: string = '';
  email: string = '';
  /** Адрес кандидата */
  address: string = '';
  /** возраст */
  age: number = 0;
  /** этап */
  step: string = '';
  /** время на этапе */
  step_time: string = '';
  /** Гражданство */
  citizenship: string = '';
  /** дата отклика */
  negotiation_date: string = '';
  /** коментарий к кандидату */
  comment: string = '';
  /** заголовок резюме */
  resume_title: string = '';
  /** ожидаемая зп */
  salary: number = 0;
  /** Автор вакансии */
  vacancy_author: string = '';
  params?: DbmodelsApplicantParams;
  /** Пол кандидата */
  gender?: ModelsGenderType;
  /** статус отклика */
  negotiation_status?: ModelsNegotiationStatus;
  /** Готовность к переезду */
  relocation?: ModelsRelocationType;
  /** источник */
  source?: ModelsApplicantSource;

  get statusClass(): StatusTag {
    switch (this.negotiation_status) {
      case ModelsNegotiationStatus.NegotiationStatusAccepted:
        return 'success';
      case ModelsNegotiationStatus.NegotiationStatusWait:
        return 'warning';
      case ModelsNegotiationStatus.NegotiationStatusRejected:
        return 'danger';
      default:
        return 'info';
    }
  }

  constructor(negotiation: NegotiationapimodelsNegotiationView) {
    Object.assign(this, negotiation);
  }
}

