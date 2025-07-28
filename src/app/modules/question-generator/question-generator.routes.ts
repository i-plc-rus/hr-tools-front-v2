import { Routes } from "@angular/router";
import { QuestionGeneratorComponent } from "./question-generator.component";

export const routes: Routes = [
  {
    path: '',
    component: QuestionGeneratorComponent, 
  },
  {
    path: '**',
    redirectTo: ''
  }
]