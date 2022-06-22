import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCarIvaComponent } from './buy-car-iva.component';

describe('BuyCarIvaComponent', () => {
  let component: BuyCarIvaComponent;
  let fixture: ComponentFixture<BuyCarIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCarIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCarIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
