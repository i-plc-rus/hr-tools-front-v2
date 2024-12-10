import {ModelsUserRole, SpaceapimodelsSpaceUser} from '../api/data-contracts';

export class SpaceUser implements SpaceapimodelsSpaceUser {
  id: string = '';
  space_id: string = '';
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  phone_number: string = '';
  is_admin: boolean = false;

  password: string = '';
  //is_active: boolean = true;  //todo работает или уволен
  role: string = '';
  get fullName(): string {
    return this.first_name + ' ' + this.last_name;
  }

  constructor(user: SpaceapimodelsSpaceUser) {
    Object.assign(this, user);
  }
}
