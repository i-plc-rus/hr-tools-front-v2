import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {VacancyModalService} from '../../../services/vacancy-modal.service';
import {FormControl} from '@angular/forms';
import {ApiService} from '../../../api/Api';
import { VacancyapimodelsCommentView } from '../../../api/data-contracts';

@Component({
  selector: 'app-generate-description-modal',
  templateUrl: './generate-description-modal.component.html',
  styleUrl: './generate-description-modal.component.scss',
})
export class GenerateDescriptionModalComponent implements OnInit {
  @Input() control!: FormControl;
  onSubmit = new EventEmitter<VacancyapimodelsCommentView>();
  isGenerated = false;
  isLoading = false;
  defaultPromt = '<strong>Требования:</strong><br/><br/><strong>Обязанности:</strong><br/><br/><strong>Условия работы:</strong><br/><br/>';
  savedPromt = '';
  textEditor = new FormControl(this.defaultPromt);

  constructor(
    private modalService: VacancyModalService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.modalService.closeModal();
  }

  generateDescription() {
    this.savedPromt = this.textEditor.value || this.defaultPromt;
    this.isLoading = true;
    this.api.v1GptGenerateVacancyDescriptionCreate({text: this.savedPromt}, {observe: 'response'}).subscribe({
      next: (res) => {
        if (res.body?.data) {
          this.textEditor.setValue(res.body.data.description);
          console.log(res.body);
        }
        this.isLoading = false;
        this.isGenerated = true;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    });
  }

  addToControl() {
    this.control.setValue(this.textEditor.value);
    this.closeModal();
  }

  reset() {
    this.isGenerated = false;
    this.textEditor.setValue(this.savedPromt !== '' ? this.savedPromt : this.defaultPromt);
  }

}
