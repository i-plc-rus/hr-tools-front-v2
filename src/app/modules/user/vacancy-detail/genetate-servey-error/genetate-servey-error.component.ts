import { Component, EventEmitter, Input } from '@angular/core';
import { UsersModalService } from '../../../../services/users-modal.service';
import { GptmodelsGenVacancyDescRequest } from '../../../../api/data-contracts';
import { ApiService } from '../../../../api/Api';

@Component({
  selector: 'app-genetate-servey-error',
  templateUrl: './genetate-servey-error.component.html',
  styleUrl: './genetate-servey-error.component.scss',
})
export class GenetateServeyErrorComponent {
  @Input() user?: any;
  onSubmit = new EventEmitter<any>();

  constructor(
    private modalService: UsersModalService,
    private api: ApiService,
  ) {}

  submit(): void {
    this.modalService.closeModal();
  }

  repeat(): void {
    this.modalService.closeModal();
    this.modalService.openGenerateSurveyModal().subscribe((confirmedData: any | undefined) => {
        if (confirmedData) {
          const newBlank: GptmodelsGenVacancyDescRequest = {
            text: JSON.stringify(confirmedData),
          };
          this.api.v1GptGenerateVacancyDescriptionCreate(newBlank).subscribe({
            next: () => {
              this.modalService.closeModal();
              this.modalService.openGenerateSurveySuccessModal();
            },
            error: (error) => {
              console.log(error);
              this.modalService.closeModal();
              this.modalService.openGenerateSurveyErrorModal();
            },
          });
        } else {
          console.log('error');
          this.modalService.closeModal();
          this.modalService.openGenerateSurveyErrorModal();
        }
      });
  }
}
