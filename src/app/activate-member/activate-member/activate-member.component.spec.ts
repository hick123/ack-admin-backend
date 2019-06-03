import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateMemberComponent } from './activate-member.component';

describe('ActivateMemberComponent', () => {
  let component: ActivateMemberComponent;
  let fixture: ComponentFixture<ActivateMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivateMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
