import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsSuperminComponent } from './car-details-supermin.component';

describe('CarDetailsSuperminComponent', () => {
  let component: CarDetailsSuperminComponent;
  let fixture: ComponentFixture<CarDetailsSuperminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailsSuperminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarDetailsSuperminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
