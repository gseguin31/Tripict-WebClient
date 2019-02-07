import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayActivitiesComponent } from './display-activities.component';

describe('DisplayActivitiesComponent', () => {
  let component: DisplayActivitiesComponent;
  let fixture: ComponentFixture<DisplayActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
