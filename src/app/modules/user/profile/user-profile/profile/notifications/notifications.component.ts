import {Component, OnInit, signal} from '@angular/core';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {HttpResponse} from '@angular/common/http';
import {ApiService} from '../../../../../../api/Api';
import {
  ModelsSpacePushSettingCode,
  SpaceapimodelsPushSettingData,
  SpaceapimodelsPushSettings
} from '../../../../../../api/data-contracts';

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

  constructor(private api: ApiService ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.api.v1UserProfilePushSettingsList().subscribe({
      next: (response) => {
        const httpResponse = response as unknown as HttpResponse<{ data: SpaceapimodelsPushSettings }>;

        if (httpResponse.body?.data) {
          const settings = httpResponse.body.data.settings ?? [];

          const updatedNotifications: NotificationSetting[] = this.notifications().map(existingItem => {
            const updatedItem = settings.find(event => event.code === existingItem.code);
            return updatedItem
              ? {
                event: updatedItem.name ?? '',
                system: updatedItem.value?.system ?? false,
                email: updatedItem.value?.email ?? false,
                telegram: updatedItem.value?.tg ?? false,
                code: updatedItem.code as ModelsSpacePushSettingCode
              }
              : existingItem;
          });

          settings.forEach(event => {
            if (!updatedNotifications.some(item => item.code === event.code)) {
              updatedNotifications.push({
                event: event.name ?? '',
                system: event.value?.system ?? false,
                email: event.value?.email ?? false,
                telegram: event.value?.tg ?? false,
                code: event.code as ModelsSpacePushSettingCode
              });
            }
          });

          this.notifications.set(updatedNotifications);
        }
      },
      error: (err) => console.error('Ошиба получения уведомлений:', err)
    });
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
