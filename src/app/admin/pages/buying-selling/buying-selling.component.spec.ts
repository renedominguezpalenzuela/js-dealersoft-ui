import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyingSellingComponent } from './buying-selling.component';

describe('BuyingSellingComponent', () => {
  let component: BuyingSellingComponent;
  let fixture: ComponentFixture<BuyingSellingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyingSellingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyingSellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
