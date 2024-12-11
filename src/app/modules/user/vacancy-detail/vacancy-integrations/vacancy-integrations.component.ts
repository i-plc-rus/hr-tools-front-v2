import { Component } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ModelsEmployment, ModelsExperience, ModelsSchedule} from '../../../../api/data-contracts';
import {ApiService} from '../../../../api/Api';

@Component({
  selector: 'app-vacancy-integrations',
  templateUrl: './vacancy-integrations.component.html',
  styleUrl: './vacancy-integrations.component.scss'
})
export class VacancyIntegrationsComponent {

  constructor(private api: ApiService) { }

showHHLogs() {
  console.log('showHHLogs');
}

showAvitoLogs() {
  console.log('showAvitoLogs');
}

checkHHConnection() {
  this.api.v1SpaceExtHhCheckConnectedList({}).subscribe({
    next: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.log(error);
    }
  });
}

checkAvitoConnection() {
  this.api.v1SpaceExtAvitoCheckConnectedList({}).subscribe({
    next: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.log(error);
    }
  });
}
}
