import { Injectable } from '@angular/core';
import {SpaceapimodelsCreateOrganization} from '../../../api/data-contracts';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private _organizationData: SpaceapimodelsCreateOrganization = {};

  get organizationData() {
    return this._organizationData;
  }

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params: any) => {
      if (params && params.orgData) {
        this.updateOrganizationData(JSON.parse(params.orgData));
      }
    });
  }


  public updateOrganizationData(data: SpaceapimodelsCreateOrganization) {
    this._organizationData = {
      ...this._organizationData,
      ...data,
    }
  }
}
