import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewFailComponent } from './interview-fail.component';

describe('InterviewFailComponent', () => {
  let component: InterviewFailComponent;
  let fixture: ComponentFixture<InterviewFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterviewFailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
