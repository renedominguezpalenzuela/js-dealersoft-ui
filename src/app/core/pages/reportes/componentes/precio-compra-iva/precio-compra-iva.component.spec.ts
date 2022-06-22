import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioCompraIvaComponent } from './precio-compra-iva.component';

describe('PrecioCompraIvaComponent', () => {
  let component: PrecioCompraIvaComponent;
  let fixture: ComponentFixture<PrecioCompraIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioCompraIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioCompraIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
