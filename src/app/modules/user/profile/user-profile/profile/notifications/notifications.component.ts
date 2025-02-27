import {Component, OnInit, signal} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {HttpResponse} from '@angular/common/http';
import {ApiService} from '../../../../../../api/Api';
import {
  ModelsSpacePushSettingCode,
  SpaceapimodelsPushSettingData,
  SpaceapimodelsPushSettings
} from '../../../../../../api/data-contracts';
import {LoadingWrapperService} from '../../../services/loading-wrapper.service';

export interface NotificationSetting {
  event: string;
  system: boolean;
  email: boolean;
  telegram: boolean;
  code: ModelsSpacePushSettingCode;
}
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})

export class NotificationsComponent implements OnInit {
  displayedColumns: string[] = ['event', 'system', 'email', 'telegram'];
  notifications = signal<NotificationSetting[]>([]);
  pushEnabled = signal(false);

  constructor(private api: ApiService, private loadingService: LoadingWrapperService) {
  }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
   this.loadingService.setLoading(true)
    this.api.v1UserProfilePushSettingsList().subscribe({
      next: (response) => {
        const httpResponse = response as unknown as HttpResponse<{ data: SpaceapimodelsPushSettings }>;

        if (httpResponse.body?.data) {
          const settings = httpResponse.body.data.settings ?? [];

          this.pushEnabled.set(httpResponse.body.data.is_active ?? false);
          const updatedNotifications: NotificationSetting[] = settings.map(event => ({
            event: event.name ?? '',
            system: event.value?.system ?? false,
            email: event.value?.email ?? false,
            telegram: event.value?.tg ?? false,
            code: event.code as ModelsSpacePushSettingCode
          }));

          this.notifications.set(updatedNotifications);
        }
        this.loadingService.setLoading(false)
      },
      error: (err) => {
        console.error('Ошибка получения уведомлений:', err);
        this.loadingService.setLoading(false)
      }    });
  }

  togglePushNotifications(enabled: boolean): void {
    this.api.v1UserProfilePushSettingsEnableUpdate({ set: enabled }).subscribe(() => {
      this.pushEnabled.set(enabled);
    });
  }

  /** обновление  уведомлений */
  updateNotification(eventCode: ModelsSpacePushSettingCode, field: 'system' | 'email' | 'telegram', change: MatCheckboxChange): void {
    this.notifications.update(existingList => {
      return existingList.map(item => {
        if (item.code === eventCode) {
          const updatedItem = { ...item, [field]: change.checked };

          const updateData: SpaceapimodelsPushSettingData = {
            code: eventCode,
            value: {
              system: updatedItem.system,
              email: updatedItem.email,
              tg: updatedItem.telegram
            }
          };

          this.api.v1UserProfilePushSettingsUpdate(updateData).subscribe();

          return updatedItem;
        }
        return item;
      });
    });
  }
  trackByCode(index: number, item: NotificationSetting): string {
    return item.code;
  }

}
