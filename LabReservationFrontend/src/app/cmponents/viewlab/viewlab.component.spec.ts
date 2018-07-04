import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlabComponent } from './viewlab.component';

describe('ViewlabComponent', () => {
  let component: ViewlabComponent;
  let fixture: ComponentFixture<ViewlabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
