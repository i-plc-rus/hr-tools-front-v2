import { Routes } from "@angular/router";
import { VideoChatComponent } from "./video-chat.component";

export const routes: Routes = [
  {
    path: '',
    component: VideoChatComponent,
   
  },
  {
    path: '**',
    redirectTo: ''
  }
]