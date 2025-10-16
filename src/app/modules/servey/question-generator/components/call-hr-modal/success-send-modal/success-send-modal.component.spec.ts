import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSendModalComponent } from './success-send-modal.component';

describe('SuccessSendModalComponent', () => {
  let component: SuccessSendModalComponent;
  let fixture: ComponentFixture<SuccessSendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuccessSendModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessSendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
