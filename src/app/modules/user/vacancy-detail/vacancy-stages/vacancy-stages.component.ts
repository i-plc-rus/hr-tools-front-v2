import {Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelsLimitType, VacancyapimodelsSelectionStageView} from '../../../../api/data-contracts';
import {VacancyView} from '../../../../models/Vacancy';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {ApiService} from '../../../../api/Api';

@Component({
  selector: 'app-vacancy-stages',
  templateUrl: './vacancy-stages.component.html',
  styleUrl: './vacancy-stages.component.scss'
})
export class VacancyStagesComponent implements OnChanges {
  @Input() vacancy?: VacancyView;
  @ViewChild('newStageFormElement') newStageFormElement?: ElementRef;
  stages: VacancyapimodelsSelectionStageView[] = [];
  newStageOpened = false;
  newStageForm: FormGroup = new FormGroup({
    can_delete: new FormControl<boolean>(true, {nonNullable: true}),
    name: new FormControl<string>('', Validators.required),
    limit_type: new FormControl<ModelsLimitType | undefined>(undefined),
    limit_value: new FormControl<number | undefined>(undefined),
    stage_order: new FormControl<number>(1, {nonNullable: true}),
    stage_type: new FormControl<string>('', Validators.required)
  });
  limitTypes = Object.values(ModelsLimitType);

  constructor(private api: ApiService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vacancy']) {
      this.stages = this.vacancy?.selection_stages || [];
    }
  }

  openNewStageForm() {
    this.newStageOpened = true;
    this.newStageForm.controls['stage_order'].setValue(this.stages.length + 1);
    setTimeout(() =>
      this.newStageFormElement?.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'}),
      100);
  }

  addNewStage() {
    const newStage = this.newStageForm.value as VacancyapimodelsSelectionStageView;
    this.api.v1SpaceVacancyStageCreate(this.vacancy?.id || '', newStage).subscribe({
      next: () => {
        this.newStageOpened = false;
        this.newStageForm.reset();
        this.getStages();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  deleteStage(stage_id: string) {
    this.api.v1SpaceVacancyStageDelete(this.vacancy?.id || '', {stage_id}, {observe: 'response'}).subscribe({
      next: () => {
        this.getStages();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getStages() {
    this.api.v1SpaceVacancyStageListCreate(this.vacancy?.id || '', {observe: 'response'}).subscribe({
      next: (data) => {
        if (data.body?.data) {
          const dataStages = data.body.data as VacancyapimodelsSelectionStageView[];
          this.stages = dataStages.sort((a, b) => (a.stage_order || 0) - (b.stage_order || 0));
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  drop(event: CdkDragDrop<VacancyapimodelsSelectionStageView[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    const stage_id = event.container.data[event.currentIndex].id || '';
    const stage_order = event.currentIndex + 1;
    this.api.v1SpaceVacancyStageChangeOrderUpdate(this.vacancy?.id || '', {stage_id, stage_order}).subscribe({
      next: () => {
        this.getStages();
      },
      error: (error) => {
        moveItemInArray(event.container.data, event.currentIndex, event.previousIndex);
        console.error(error);
      }
    })

  }
}
