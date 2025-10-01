import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateSurveySuccessComponent } from './generate-survey-success.component';

describe('GenerateSurveySuccessComponent', () => {
  let component: GenerateSurveySuccessComponent;
  let fixture: ComponentFixture<GenerateSurveySuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateSurveySuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateSurveySuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
