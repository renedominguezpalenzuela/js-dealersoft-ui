import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Contrato2FechaComponent } from './contrato2-fecha.component';

describe('Contrato2FechaComponent', () => {
  let component: Contrato2FechaComponent;
  let fixture: ComponentFixture<Contrato2FechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Contrato2FechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Contrato2FechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
