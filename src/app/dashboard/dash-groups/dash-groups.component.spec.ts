import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashGroupsComponent } from './dash-groups.component';

describe('DashGroupsComponent', () => {
  let component: DashGroupsComponent;
  let fixture: ComponentFixture<DashGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
