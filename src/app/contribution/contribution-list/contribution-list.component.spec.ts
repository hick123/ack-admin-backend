import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContributionListComponent } from './contribution-list.component';

describe('ContributionListComponent', () => {
  let component: ContributionListComponent;
  let fixture: ComponentFixture<ContributionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContributionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContributionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
