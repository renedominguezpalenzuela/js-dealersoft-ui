import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingLoginComponent } from './landing-login.component';

describe('LandingLoginComponent', () => {
  let component: LandingLoginComponent;
  let fixture: ComponentFixture<LandingLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingLoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
