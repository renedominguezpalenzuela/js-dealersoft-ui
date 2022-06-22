import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsCompraComponent } from './car-details-compra.component';

describe('CarDetailsCompraComponent', () => {
  let component: CarDetailsCompraComponent;
  let fixture: ComponentFixture<CarDetailsCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailsCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailsCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
