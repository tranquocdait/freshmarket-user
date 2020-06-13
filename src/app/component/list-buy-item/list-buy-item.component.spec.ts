import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBuyItemComponent } from './list-buy-item.component';

describe('ListBuyItemComponent', () => {
  let component: ListBuyItemComponent;
  let fixture: ComponentFixture<ListBuyItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBuyItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBuyItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
