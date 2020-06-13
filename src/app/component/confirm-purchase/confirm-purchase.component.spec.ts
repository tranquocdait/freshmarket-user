import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPurchaseComponent } from './confirm-purchase.component';

describe('ConfirmPurchaseComponent', () => {
  let component: ConfirmPurchaseComponent;
  let fixture: ComponentFixture<ConfirmPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
