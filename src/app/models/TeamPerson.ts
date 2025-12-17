import {ModelsUserRole, VacancyapimodelsTeamPerson} from "../api/data-contracts";


export class TeamPerson implements VacancyapimodelsTeamPerson {
  /** Email пользователя */
  email: string = '';
  full_name: string = '';
  id: string = '';
  responsible: boolean = false;
  role?: ModelsUserRole;

  get roleName(): string {
    switch (this.role) {
      case ModelsUserRole.UserRoleSuperAdmin:
        return 'Суперадмин';
      case ModelsUserRole.AdminRole:
        return 'Администратор';
      case ModelsUserRole.HRRole:
        return 'HR';
      case ModelsUserRole.ManagerRole:
        return 'Менеджер';
      case ModelsUserRole.SpecialistRole:
        return 'Пользователь';
      default:
        return '';
    }
  }

  constructor(teamPerson: VacancyapimodelsTeamPerson) {
    Object.assign(this, teamPerson);
  }
}