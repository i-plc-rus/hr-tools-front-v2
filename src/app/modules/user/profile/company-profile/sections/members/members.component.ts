import {Component, OnInit} from '@angular/core';
import {
  ApimodelsScrollerResponse,
  SpaceapimodelsSpaceUser,
  SpaceapimodelsSpaceUserFilter
} from '../../../../../../api/data-contracts';
import {HttpResponse} from '@angular/common/http';
import {ApiService} from '../../../../../../api/Api';
interface Participant {
  avatar: string;
  name: string;
  phone: string;
  email: string;
  role: string;
}
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrl: './members.component.scss'
})
export class MembersComponent implements OnInit{
  participants: Participant[] = [];

  displayedColumns: string[] = ['avatar', 'name', 'contacts', 'role', 'actions'];

  clickedRows = new Set<Participant>();

  constructor(private api: ApiService) {
  }
  toggleRow(row: Participant) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.add(row);
    }
  }

  ngOnInit(): void {
    this.loadUserData()
  }

  private loadUserData(): void {
    const filter: SpaceapimodelsSpaceUserFilter = { limit: 10, page: 1 };

    this.api.v1UsersListCreate(filter, { observe: "response" }).subscribe({
      next: (response) => {
        let responseBody: ApimodelsScrollerResponse & { data?: SpaceapimodelsSpaceUser[] };

        if ("body" in response) {
          responseBody = response.body as ApimodelsScrollerResponse & { data?: SpaceapimodelsSpaceUser[] };
        } else {
          responseBody = response as ApimodelsScrollerResponse & { data?: SpaceapimodelsSpaceUser[] };
        }

        if (responseBody?.data) {
          this.participants = responseBody.data.map((user: SpaceapimodelsSpaceUser) => ({
            avatar: "https://via.placeholder.com/40",
            name: `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim(),
            phone: user.phone_number || "Не указан",
            email: user.email || "Не указан",
            role: user.role || "Не указана"
          }));
          this.loadUserAvatars();
          console.log("Пользователи:", this.participants);
        } else {
          console.warn("Пустой ответ от API.");
        }
      },
      error: (err) => console.error("Что-то пошло не так с загрузкой пользователей:", err),
    });
  }

  private loadUserAvatars(): void {
    this.participants.forEach((participant, index) => {
      this.api.v1UserProfilePhotoList({ observe: "response" }).subscribe({
        next: (photoResponse) => {
          if (photoResponse.ok && photoResponse.body !== null && typeof photoResponse.body === "object") {
            const imageUrl = URL.createObjectURL(photoResponse.body as Blob);
            this.participants[index].avatar = imageUrl;
          } else {
            this.participants[index].avatar = "assets/icons/ic-person.svg";
          }
        },
        error: () => {
          this.participants[index].avatar = "assets/icons/ic-person.svg";
        }
      });
    });
  }


}
