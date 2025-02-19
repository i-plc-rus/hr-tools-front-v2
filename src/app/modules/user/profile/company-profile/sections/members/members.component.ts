import {Component, OnInit} from '@angular/core';
import {
  ApimodelsScrollerResponse,
  SpaceapimodelsSpaceUser,
  SpaceapimodelsSpaceUserFilter
} from '../../../../../../api/data-contracts';
import {ApiService} from '../../../../../../api/Api';
import {LoadingWrapperService} from '../../../services/loading-wrapper.service';
import {UsersModalService} from '../../../../../../services/users-modal.service';
import {tap} from 'rxjs';

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
export class MembersComponent implements OnInit{
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

  constructor(private api: ApiService, private loadingService: LoadingWrapperService, private modalService: UsersModalService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.loadingService.setLoading(true);

    this.api.v1UsersListCreate({ limit: 10, page: 1 }, { observe: 'response' }).subscribe({
      next: (response) => this.handleUserResponse(response),
      error: (err) => this.handleError(err, 'Ошибка загрузки пользователей!')
    });
  }

  private loadUserAvatars(): void {
    this.participants.forEach((user) => {
      if (!user.id) return;

      this.api.v1UserProfilePhotoList({ responseType: 'blob' as 'json' }).subscribe({
        next: (response: any) => this.handleAvatarResponse(user.id!, response),
        error: (err) => this.handleError(err, `Ошибка згрузки фото ${user.id}`)
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
    const responseBody = 'body' in response ? response.body : response;

    if (responseBody?.data?.length) {
      this.participants = responseBody.data;
      this.loadUserAvatars();
    } else {
      console.warn('Пустой ответ от API.');
    }

    this.loadingService.setLoading(false);
  }


  private handleAvatarResponse(userId: string, response: any): void {
    if (response instanceof Blob) {
      const reader = new FileReader();
      reader.onload = () => this.avatarsMap.set(userId, reader.result as string);
      reader.readAsDataURL(response);
    } else {
      console.warn(`API вернул неожиданные данные для ${userId}:`, response);
      this.avatarsMap.set(userId, 'assets/icons/ic-person.svg');
    }
  }

  private handleSuccessfulDeletion(userId: string): void {
    this.participants = this.participants.filter(p => p.id !== userId);
  }


  private handleError(err: any, message: string): void {
    console.error(message, err);
    this.loadingService.setLoading(false);
  }

  openEditMemberModal(user: SpaceapimodelsSpaceUser) {
    if (user.id) {
      this.modalService.editMemberModal(user.id).subscribe((updated) => {
        if (updated) {
          this.loadUserData();
        }
      });
    }
  }

  openAddMemberModal(): void {
    this.modalService.addMemberModal().subscribe((added) => {
      if (added) {
        this.loadUserData();
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
