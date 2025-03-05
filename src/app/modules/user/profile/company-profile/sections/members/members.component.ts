import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {SpaceapimodelsSpaceUser} from '../../../../../../api/data-contracts';
import {ApiService} from '../../../../../../api/Api';
import {LoadingWrapperService} from '../../../services/loading-wrapper.service';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {RequestOptions} from '../../../../../../api/http-client';

enum TableColumns {
  Avatar = 'avatar',
  Name = 'name',
  Contacts = 'contacts',
  Role = 'role',
  Actions = 'actions'
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements OnInit {
  participants: SpaceapimodelsSpaceUser[] = [];
  avatarsMap = new Map<string, string>(); // Храним аватары отдельно

  displayedColumns: string[] = [
    TableColumns.Avatar,
    TableColumns.Name,
    TableColumns.Contacts,
    TableColumns.Role,
    TableColumns.Actions
  ];

  clickedRows = new Set<string>();

  constructor(private api: ApiService, private loadingService: LoadingWrapperService, private modalService: UsersModalService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.loadingService.setLoading(true);
    this.api.v1UsersListCreate({}).subscribe({
      next: (response) => this.handleUserResponse(response),
      error: (err) => this.handleError(err, 'Ошибка загрузки пользователей!')
    });
  }

  private loadUserAvatars(): void {
    this.participants.forEach((user) => {

      if (!user.id) return;
      this.api.v1UsersPhotoDetail(user.id, {responseType: 'blob'} as RequestOptions).subscribe({
        next: (resp) => {
          const blob: Blob = resp as unknown as Blob
          if (blob.size) {
            this.handleAvatarResponse(user.id!, resp)
          }
        },
        error: (err) => this.handleError(err, `Ошибка загрузки фото ${user.id}`)
      });
    });
  }


  deleteParticipant(user: SpaceapimodelsSpaceUser): void {
    if (!user.id) return;

    const confirmDelete = window.confirm(`Вы уверены, что хотите удалить пользователя ${user.last_name} ${user.first_name}?`);
    if (!confirmDelete) return;

    this.api.v1AdminPanelUserDeleteDelete(user.id).subscribe({
      next: () => this.handleSuccessfulDeletion(user.id!),
      error: (err) => this.handleError(err, `Ошибка при удалении ${user.last_name} ${user.first_name}`)
    });
  }

  private handleUserResponse(response: any): void {
    if (response.body.data) {
      this.participants = response.body.data;
      this.loadUserAvatars();

    } else {
      console.warn('Пустой ответ от API.');
    }
    this.loadingService.setLoading(false);
  }

  private handleAvatarResponse(userId: string, response: any): void {
    const reader = new FileReader();

    reader.onload = () => this.avatarsMap.set(userId, reader.result as string);
    reader.readAsDataURL(response);
    this.cdr.detectChanges()
  }


  private handleSuccessfulDeletion(userId: string): void {
    this.participants = this.participants.filter(p => p.id !== userId);
  }


  private handleError(err: any, message: string): void {
    console.error(message, err);
    this.loadingService.setLoading(false);
  }

  openEditMemberModal(user: SpaceapimodelsSpaceUser) {
    if (!user.id) return;

    this.modalService.editMemberModal(user.id).subscribe((updated) => {
      if (updated) {
        this.loadUserData();
      }
    });
  }

  openAddMemberModal(): void {
    this.modalService.addMemberModal().subscribe((added) => {
      if (added) {
        this.loadUserData();
        this.cdr.detectChanges()
      }
    });
  }

  getAvatar(userId: string): string {
    return this.avatarsMap.get(userId) || 'assets/icons/ic-person.svg';
  }


  toggleRow(participant: SpaceapimodelsSpaceUser) {
    if (participant.id) {
      if (this.clickedRows.has(participant.id)) {
        this.clickedRows.delete(participant.id);
      } else {
        this.clickedRows.add(participant.id);
      }
    }
  }
}
