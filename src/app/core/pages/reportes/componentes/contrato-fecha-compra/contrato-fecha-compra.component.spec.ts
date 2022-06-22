import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoFechaCompraComponent } from './contrato-fecha-compra.component';

describe('ContratoFechaCompraComponent', () => {
  let component: ContratoFechaCompraComponent;
  let fixture: ComponentFixture<ContratoFechaCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContratoFechaCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratoFechaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
