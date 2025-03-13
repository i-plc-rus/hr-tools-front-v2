import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {VacancyView} from '../../../../models/Vacancy';
import {ApiService} from '../../../../api/Api';
import {MatDialog} from '@angular/material/dialog';
import {ModelsVacancyPubStatus, VacancyapimodelsExtVacancyInfo} from '../../../../api/data-contracts';
import {forkJoin, tap} from 'rxjs';

@Component({
  selector: 'app-vacancy-publication',
  templateUrl: './vacancy-publication.component.html',
  styleUrl: './vacancy-publication.component.scss'
})
export class VacancyPublicationComponent implements OnInit {
  @Input() vacancy?: VacancyView;
  @ViewChild('attachDialog') attachDialog!: TemplateRef<any>;
  attachDialogType: 'hh' | 'avito' = 'hh';
  isHHConnected = false;
  isAvitoConnected = false;
  statusHH?: VacancyapimodelsExtVacancyInfo;
  statusAvito?: VacancyapimodelsExtVacancyInfo;
  errorMessageHH?: string;
  errorMessageAvito?: string;
  isLoading = true;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getStatuses();
  }

  getStatuses() {
    if (!this.vacancy) return;
    this.isLoading = true;
    this.clearErrors();

    forkJoin([
      this.checkHHConnected(),
      this.checkAvitoConnected(),
      this.getStatusHH(this.vacancy.id),
      this.getStatusAvito(this.vacancy.id)
    ]).subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

  checkHHConnected() {
    return this.api.v1SpaceExtHhCheckConnectedList({}).pipe(
      tap({
        next: (res) => {
          this.isHHConnected = !!res.data;
        },
        error: (error) => {
          console.log(error);
        }
      })
    )
  }

  checkAvitoConnected() {
    return this.api.v1SpaceExtAvitoCheckConnectedList({}).pipe(
      tap({
        next: (res) => {
          this.isAvitoConnected = !!res.data;
        },
        error: (error) => {
          console.log(error);
        }
      })
    )
  }

  getStatusHH(id: string) {
    return this.api.v1SpaceExtHhStatusDetail(id, { observe: 'response' }).pipe(
      tap({
        next: (res) => {
          if (res.body?.data) {
            this.statusHH = res.body.data;

          } else {
            this.statusHH = undefined;
          }
        },
        error: (error) => {
          console.log(error);
        }
      })
    );
  }


  getStatusAvito(id: string) {
    return this.api.v1SpaceExtAvitoStatusDetail(id, {observe: 'response'}).pipe(
      tap({
        next: (res) => {
          if (res.body?.data) {
            this.statusAvito = res.body.data;
          } else
            this.statusAvito = undefined;
        },
        error: (error) => {
          console.log(error);
        }
      })
    )
  }

  connectHH() {
    this.isLoading = true;
    this.api.v1SpaceExtHhConnectUriList({}).subscribe({
      next: (res) => {
        if (res.data) {
          const url = new URL(res.data);
          window.open(url, '_blank');
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

  connectAvito() {
    this.isLoading = true;
    this.api.v1SpaceExtAvitoConnectUriList({}).subscribe({
      next: (res) => {
        if (res.data) {
          const url = new URL(res.data);
          window.open(url, '_blank');
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

  publishHHVacancy() {
    if (!this.vacancy) return;
    this.isLoading = true;
    this.clearErrors();

    this.api.v1SpaceExtHhPublishUpdate(this.vacancy.id, {observe: 'response'}).subscribe({
      next: () => {
        this.getStatuses();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessageHH = JSON.parse(error.message).error.message;
        this.isLoading = false;
      }
    })
  }

  publishAvitoVacancy() {
    if (!this.vacancy) return;
    this.isLoading = true;
    this.clearErrors();

    this.api.v1SpaceExtAvitoPublishUpdate(this.vacancy.id, {observe: 'response'}).subscribe({
      next: () => {
        this.getStatuses();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessageAvito = JSON.parse(error.message).error.message;
        this.isLoading = false;
      }
    })
  }

  updateHHVacancy() {
    if (!this.vacancy) return;
    this.isLoading = true;
    this.clearErrors();

    this.api.v1SpaceExtHhUpdateUpdate(this.vacancy.id, {}).subscribe({
      next: () => {
        this.getStatuses();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessageHH = JSON.parse(error.message).error.message;
        this.isLoading = false;
      }
    })
  }

  updateAvitoVacancy() {
    if (!this.vacancy) return;
    this.isLoading = true;
    this.clearErrors();

    this.api.v1SpaceExtAvitoUpdateUpdate(this.vacancy.id, {}).subscribe({
      next: () => {
        this.getStatuses();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessageAvito = JSON.parse(error.message).error.message;
        this.isLoading = false;
      }
    })
  }

  closeHHVacancy() {
    if (!this.vacancy) return;
    this.isLoading = true;
    this.clearErrors();

    this.api.v1SpaceExtHhCloseUpdate(this.vacancy.id, {}).subscribe({
      next: () => {
        this.getStatuses();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessageHH = JSON.parse(error.message).error.message;
        this.isLoading = false;
      }
    })
  }

  closeAvitoVacancy() {
    if (!this.vacancy) return;
    this.isLoading = true;
    this.clearErrors();

    this.api.v1SpaceExtAvitoCloseUpdate(this.vacancy.id, {}).subscribe({
      next: () => {
        this.getStatuses();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessageAvito = JSON.parse(error.message).error.message;
        this.isLoading = false;
      }
    })
  }

  attachVacancy(inputValue: string) {
    if (this.attachDialogType === 'hh') {
      this.attachHH(inputValue);
    }
    else if (this.attachDialogType === 'avito') {
      this.attachAvito(parseInt(inputValue));
    }
  }

  attachHH(url?: string) {
    if (!this.vacancy) return;
    this.isLoading = true;
    this.clearErrors();

    this.api.v1SpaceExtHhAttachUpdate(this.vacancy.id, {url}).subscribe({
      next: () => {
        this.closeDialog();
        this.getStatuses();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessageHH = JSON.parse(error.message).error.message;
        this.isLoading = false;
      }
    })
  }

  attachAvito(id?: number) {
    if (!this.vacancy) return;
    this.isLoading = true;
    this.clearErrors();

    this.api.v1SpaceExtAvitoAttachUpdate(this.vacancy.id, {id}).subscribe({
      next: () => {
        this.closeDialog();
        this.getStatuses();
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessageAvito = JSON.parse(error.message).error.message;
        this.isLoading = false;
      }
    })
  }

  openAttachDialog(type: 'hh' | 'avito') {
    this.attachDialogType = type;
    this.dialog.open(this.attachDialog, {panelClass: 'w-full'});
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  goToHHVacancy() {
    if (!this.vacancy) return;
    const url = this.statusHH?.url;
    if (url)
      window.open(url, '_blank');
  }

  goToAvitoVacancy() {
    if (!this.vacancy) return;
    const url = this.statusAvito?.url;
    if (url)
      window.open(url, '_blank');
  }

  clearErrors() {
    this.errorMessageHH = undefined;
    this.errorMessageAvito = undefined;
  }

  get currentHHStatus(): ModelsVacancyPubStatus | 'Не подключена' | undefined {
    if (!this.vacancy || !this.statusHH)
      return undefined;
    else
      if (!this.isHHConnected)
        return 'Не подключена';
      else
        return this.statusHH.status;
  }

  get currentAvitoStatus(): ModelsVacancyPubStatus | 'Не подключена' | 'Ожидание' {
    if (!this.vacancy || !this.statusAvito)
      return 'Ожидание'
    else
      if (!this.isAvitoConnected)
        return 'Не подключена';
      else
        return this.statusAvito.status || 'Ожидание';
  }
}
