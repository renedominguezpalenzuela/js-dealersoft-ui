import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsMinComponent } from './car-details-min.component';

describe('CarDetailsMinComponent', () => {
  let component: CarDetailsMinComponent;
  let fixture: ComponentFixture<CarDetailsMinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailsMinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailsMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
