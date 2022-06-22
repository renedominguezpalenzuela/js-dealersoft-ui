import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCarA25Component } from './buy-car-a25.component';

describe('BuyCarA25Component', () => {
  let component: BuyCarA25Component;
  let fixture: ComponentFixture<BuyCarA25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCarA25Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCarA25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
