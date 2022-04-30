import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllVehiclesComponent } from './all-vehicles.component';

describe('AllVehiclesComponent', () => {
  let component: AllVehiclesComponent;
  let fixture: ComponentFixture<AllVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllVehiclesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
