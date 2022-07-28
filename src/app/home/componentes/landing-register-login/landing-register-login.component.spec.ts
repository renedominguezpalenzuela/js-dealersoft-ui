import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingRegisterLoginComponent } from './landing-register-login.component';

describe('LandingRegisterLoginComponent', () => {
  let component: LandingRegisterLoginComponent;
  let fixture: ComponentFixture<LandingRegisterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingRegisterLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingRegisterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
