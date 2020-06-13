import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserPostComponent } from './list-user-post.component';

describe('ListUserPostComponent', () => {
  let component: ListUserPostComponent;
  let fixture: ComponentFixture<ListUserPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListUserPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
