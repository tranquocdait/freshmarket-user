import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageCartComponent } from './storage-cart.component';

describe('StorageCartComponent', () => {
  let component: StorageCartComponent;
  let fixture: ComponentFixture<StorageCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
