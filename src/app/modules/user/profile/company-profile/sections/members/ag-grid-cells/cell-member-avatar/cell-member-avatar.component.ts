import { Component } from '@angular/core';
import {RequestOptions} from '../../../../../../../../api/http-client';
import {ICellRendererParams} from 'ag-grid-community';
import {SpaceapimodelsSpaceUser} from '../../../../../../../../api/data-contracts';
import {ApiService} from '../../../../../../../../api/Api';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-cell-member-avatar',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './cell-member-avatar.component.html',
  styleUrl: './cell-member-avatar.component.scss'
})
export class CellMemberAvatarComponent {
  userId: string = '';
  fullName: string = '';
  photo?: string;
  params?: ICellRendererParams<SpaceapimodelsSpaceUser>;

  constructor(
    private api: ApiService
  ) { }

  agInit(params: ICellRendererParams<SpaceapimodelsSpaceUser>): void {
    this.params = params;
    if (params.data) {
      this.userId = params.data.id || '';
      this.fullName = `${params.data.last_name || ''} ${params.data.first_name || ''}`;
      this.getPhoto();
    }
  }

  refresh(params?: ICellRendererParams): boolean {
    return true;
  }

  getPhoto() {
    if (!this.userId) return;

    this.api.v1UsersPhotoList(this.userId, {responseType: 'blob'} as RequestOptions).subscribe({
      next: (resp: any) => {
        const blob: Blob = resp as unknown as Blob;
        if (blob && blob.size > 0) {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target && e.target.result)
              this.photo = e.target.result as string;
          }
          reader.readAsDataURL(blob);
        }
        else {
          this.photo = '';
        }
      },
      error: (error) => {
        console.log(error);
        this.photo = '';
      }
    });
  }
}
