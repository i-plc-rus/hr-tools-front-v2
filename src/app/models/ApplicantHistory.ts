import {ApplicantapimodelsApplicantHistoryView, DbmodelsActionType, DbmodelsApplicantChanges} from "../api/data-contracts";

export class ApplicantHistoryView implements ApplicantapimodelsApplicantHistoryView {
  /** Тип действия */
  action_type?: DbmodelsActionType;
  /** Изменения */
  changes?: DbmodelsApplicantChanges;
  /** Идентификатор сотрудника */
  user_id: string = '';
  /** Имя сотрудника */
  user_name: string = '';
  /** Идентификатор вакансии */
  vacancy_id: string = '';
  /** Название вакансии */
  vacancy_name: string = '';

  get actionIcon(): {
    name: string;
    className: string;
  } {
    switch (this.action_type) {
      case DbmodelsActionType.HistoryTypeComment:
        return { name: 'forum', className: 'text-[var(--link-default)]' };
      case DbmodelsActionType.HistoryTypeAdded:
        return { name: 'add-person', className: 'text-[var(--link-default)]' };
      case DbmodelsActionType.HistoryTypeUpdate:
        return { name: 'edit', className: 'text-[var(--link-default)]' };
      case DbmodelsActionType.HistoryTypeNegotiation:
        return { name: 'assignment-ind', className: 'text-[var(--link-default)]' };
      case DbmodelsActionType.HistoryTypeStageChange:
        return { name: 'arrow-forward', className: 'text-[var(--status-color-success-text)]' };
      case DbmodelsActionType.HistoryTypeDuplicate:
        return { name: 'employees', className: 'text-[var(--link-default)]' };
      case DbmodelsActionType.HistoryTypeArchive:
        return { name: 'delete', className: 'text-[var(--link-default)]' };
      case DbmodelsActionType.HistoryTypeReject:
        return { name: 'cancel', className: 'text-[var(--status-color-danger-text)]'};
      default:
        return { name: '', className: '' };
    }
  }

  constructor(applicantHistory: ApplicantapimodelsApplicantHistoryView) {
    Object.assign(this, applicantHistory);
  }
}