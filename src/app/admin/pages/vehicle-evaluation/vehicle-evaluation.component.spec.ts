import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEvaluationComponent } from './vehicle-evaluation.component';

describe('VehicleEvaluationComponent', () => {
  let component: VehicleEvaluationComponent;
  let fixture: ComponentFixture<VehicleEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VehicleEvaluationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
