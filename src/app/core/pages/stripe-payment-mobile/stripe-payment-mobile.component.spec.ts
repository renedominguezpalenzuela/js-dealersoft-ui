import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaymentMobileComponent } from './stripe-payment-mobile.component';

describe('StripePaymentMobileComponent', () => {
  let component: StripePaymentMobileComponent;
  let fixture: ComponentFixture<StripePaymentMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StripePaymentMobileComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePaymentMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
