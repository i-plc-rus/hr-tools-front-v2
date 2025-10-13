import { Routes } from '@angular/router';
import { QuestionGeneratorComponent } from './question-generator/question-generator.component';
import { WelcomeComponent } from './question-generator/components/welcome/welcome.component';
import { QuestionsComponent } from './question-generator/components/questions/questions.component';
import { ServeyComponent } from './servey.component';

export const routes: Routes = [
  {
    path: 'survey',
    component: ServeyComponent,
    children: [
      {
        path: 'step0',
        children: [
          {
            path: ':id',
            component: QuestionGeneratorComponent,
            children: [
              {
                path: 'welcome',
                component: WelcomeComponent,
              },
              {
                path: 'questions',
                component: QuestionsComponent,
              },
              {
                path: '**',
                redirectTo: 'welcome',
              },
            ],
          },
        ],
      },
      {
        path: '**',
        redirectTo: 'step0',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'survey',
  },
];
