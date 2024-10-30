import {AdminpanelapimodelsUserView, ModelsUserRole} from "../api/data-contracts";

interface IUser extends AdminpanelapimodelsUserView {
  id?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  role?: ModelsUserRole;
  is_active?: boolean;
}

export class User implements IUser {
  id?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  role?: ModelsUserRole;
  is_active: boolean = true;
  get roleName(): string {
    switch (this.role) {
      // todo закомментил так как бэки поменяли модель, после генерации апи исчезли эти значения
      // case ModelsUserRole.UserRoleAdmin:
      //   return 'Администратор';
      // case ModelsUserRole.UserRoleUser:
      //   return 'Пользователь';
      // case ModelsUserRole.UserRoleManager:
      //   return 'Менеджер';
      // case ModelsUserRole.UserRolrHrDirector:
      //   return 'HR-директор';
      case ModelsUserRole.UserRoleSuperAdmin:
        return 'Супер администратор';
      default:
        return '';
    }
  }
  get fullName(): string {
    return this.first_name + ' ' + this.last_name;
  }

  constructor(user: IUser) {
    Object.assign(this, user);
  }
}