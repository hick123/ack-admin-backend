import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDashComponent } from './no-dash.component';

describe('NoDashComponent', () => {
  let component: NoDashComponent;
  let fixture: ComponentFixture<NoDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
