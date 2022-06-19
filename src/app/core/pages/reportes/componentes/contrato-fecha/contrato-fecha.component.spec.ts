import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoFechaComponent } from './contrato-fecha.component';

describe('ContratoFechaComponent', () => {
  let component: ContratoFechaComponent;
  let fixture: ComponentFixture<ContratoFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
