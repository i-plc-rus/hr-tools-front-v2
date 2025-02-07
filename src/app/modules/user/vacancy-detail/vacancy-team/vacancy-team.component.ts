import {Component, Input, OnInit} from '@angular/core';
import {TeamPerson} from '../../../../models/TeamPerson';
import {ApiService} from '../../../../api/Api';
import {FormControl, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {VacancyapimodelsTeamPerson} from '../../../../api/data-contracts';

@Component({
  selector: 'app-vacancy-team',
  templateUrl: './vacancy-team.component.html',
  styleUrl: './vacancy-team.component.scss'
})
export class VacancyTeamComponent implements OnInit {
  @Input() vacancyId: string = '';
  teamPersonList: TeamPerson[] = [];
  usersList: TeamPerson[] = [];
  searchUser = new FormControl('', Validators.required);
  selectedUserId = new FormControl('', Validators.required);

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    if (!this.vacancyId) return;
    this.getTeamList();
    this.getUsersList();
    this.searchUser.valueChanges
      .pipe(debounceTime(700), distinctUntilChanged())
      .subscribe(() => this.getUsersList());
  }

  getTeamList() {
    this.api.v1SpaceVacancyTeamListCreate(this.vacancyId, {observe: 'response'}).subscribe({
      next: (res) => {
        if (res.body?.data)
          this.teamPersonList = res.body.data.map((teamPerson: VacancyapimodelsTeamPerson) => new TeamPerson(teamPerson));
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getUsersList() {
    const personFilter = {
      search: this.searchUser.value || ''
    };
    this.api.v1SpaceVacancyTeamUsersListCreate(this.vacancyId, personFilter, {observe: 'response'}).subscribe({
      next: (res) => {
        if (res.body?.data)
          this.usersList = res.body.data.map((user: VacancyapimodelsTeamPerson) => new TeamPerson(user));
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  inviteUser() {
    if (!this.selectedUserId.value) return;

    this.api.v1SpaceVacancyTeamInviteUpdate(this.vacancyId, this.selectedUserId.value, {observe: 'response'}).subscribe({
      next: (res) => {
        if (res.body?.data) {
          this.resetInviteForm();
          this.getTeamList();
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  excludeUser(userId: string) {
    this.api.v1SpaceVacancyTeamExcludeUpdate(this.vacancyId, userId, {observe: 'response'}).subscribe({
      next: (res) => {
        if (res.body) {
          this.getTeamList();
          this.resetInviteForm();
          this.getUsersList();
        }
      },
      error: (err) => {
        console.log(JSON.parse(err.message).error.message);
      }
    })
  }

  resetInviteForm() {
    this.selectedUserId.reset();
    this.selectedUserId.markAsUntouched();
    this.searchUser.reset();
    this.searchUser.markAsUntouched();
  }

  setAsResponsible(userId: string) {
    this.api.v1SpaceVacancyTeamSetAsResponsibleUpdate(this.vacancyId, userId, {observe: 'response'}).subscribe({
      next: (res) => {
        if (res.body) {
          this.getTeamList();
        }
      },
      error: (error) => {
        console.log(error)
      }
    });
  }
}
