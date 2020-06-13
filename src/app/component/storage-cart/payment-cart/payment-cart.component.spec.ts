import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCartComponent } from './payment-cart.component';

describe('PaymentCartComponent', () => {
  let component: PaymentCartComponent;
  let fixture: ComponentFixture<PaymentCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
