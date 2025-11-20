import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../../api/Api';
import { embedDashboard } from '@superset-ui/embedded-sdk';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements AfterViewInit {
  private dashboardId = 'b2126416-5047-483a-b174-a32bcac3426c';

  @ViewChild('supersetContainer', { static: false })
  supersetContainer!: ElementRef<HTMLDivElement>;


  constructor(private api: ApiService) {}

  ngAfterViewInit(): void {
    this.api.v1SpaceSupersetGuestTokenList({ dashboard_code: 'recruiter_dash' }).subscribe({
      next: (res: any) => {
        const token = res.body?.data?.token;
        if (!token) return;

        const mountPoint = document.getElementById('superset-container');
        if (!mountPoint) return;

        embedDashboard({
          id: this.dashboardId,
          supersetDomain: 'https://superset.hr-tools.pro',
          mountPoint,
          fetchGuestToken: async () => token,
          dashboardUiConfig: {
            hideTitle: true,
            filters: { expanded: true }
          }
        });   
        
        if (mountPoint && mountPoint.children[0]) {
          (mountPoint.children[0] as HTMLElement).style.width = "100%";
          (mountPoint.children[0] as HTMLElement).style.height = "100%";
        }
      },
      error: (err) => {
        console.error('Ошибка при запросе токена:', err);
      }
    });
  }
}