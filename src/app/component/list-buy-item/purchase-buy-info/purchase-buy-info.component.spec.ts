import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseBuyInfoComponent } from './purchase-buy-info.component';

describe('PurchaseBuyInfoComponent', () => {
  let component: PurchaseBuyInfoComponent;
  let fixture: ComponentFixture<PurchaseBuyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseBuyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseBuyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
