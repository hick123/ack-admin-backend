import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterMembersComponent } from './cluster-members.component';

describe('ClusterMembersComponent', () => {
  let component: ClusterMembersComponent;
  let fixture: ComponentFixture<ClusterMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
