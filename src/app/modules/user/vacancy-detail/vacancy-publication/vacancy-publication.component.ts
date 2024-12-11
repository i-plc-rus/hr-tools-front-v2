import { Component, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {VacancyView} from '../../../../models/Vacancy';

@Component({
  selector: 'app-vacancy-publication',
  templateUrl: './vacancy-publication.component.html',
  styleUrl: './vacancy-publication.component.scss'
})
export class VacancyPublicationComponent {
  @Input() vacancy?: VacancyView;

}
