import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashClustersComponent } from './dash-clusters.component';

describe('DashClustersComponent', () => {
  let component: DashClustersComponent;
  let fixture: ComponentFixture<DashClustersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashClustersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashClustersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
