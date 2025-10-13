import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuestionsComponent } from './components/questions/questions.component';

@Component({
  selector: 'app-question-generator',
  templateUrl: './question-generator.component.html',
  styleUrl: './question-generator.component.scss',
})
export class QuestionGeneratorComponent {
  parentId: string | null = null;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.parentId = params.get('id');
      console.log('Parent ID:', this.parentId);
    });
  }

  onOutletActivated(component: any) {
    if (component instanceof WelcomeComponent || component instanceof QuestionsComponent) {
      component.childInputId = this.parentId;
    } 
  }
}
