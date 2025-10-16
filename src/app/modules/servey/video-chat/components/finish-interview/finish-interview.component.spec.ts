import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishInterviewComponent } from './finish-interview.component';

describe('FinishComponent', () => {
  let component: FinishInterviewComponent;
  let fixture: ComponentFixture<FinishInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishInterviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
