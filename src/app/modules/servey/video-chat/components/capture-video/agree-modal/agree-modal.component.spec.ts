import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreeModalComponent } from './agree-modal.component';

describe('AgreeModalComponent', () => {
  let component: AgreeModalComponent;
  let fixture: ComponentFixture<AgreeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgreeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgreeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
