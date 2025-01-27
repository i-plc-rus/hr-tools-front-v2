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
      case ModelsUserRole.SpaceAdminRole:
        return 'Администратор';
      case ModelsUserRole.SpaceUserRole:
        return 'Пользователь';
      default:
        return '';
    }
  }

  constructor(teamPerson: VacancyapimodelsTeamPerson) {
    Object.assign(this, teamPerson);
  }
}