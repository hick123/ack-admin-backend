import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberActiveComponent } from './member-active.component';

describe('MemberActiveComponent', () => {
  let component: MemberActiveComponent;
  let fixture: ComponentFixture<MemberActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
