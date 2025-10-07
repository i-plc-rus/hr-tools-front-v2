import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallHrModalComponent } from './call-hr-modal.component';

describe('CallHrModalComponent', () => {
  let component: CallHrModalComponent;
  let fixture: ComponentFixture<CallHrModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallHrModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallHrModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
