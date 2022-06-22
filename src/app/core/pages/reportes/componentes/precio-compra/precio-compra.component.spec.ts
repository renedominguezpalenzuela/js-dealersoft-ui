import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioCompraComponent } from './precio-compra.component';

describe('PrecioCompraComponent', () => {
  let component: PrecioCompraComponent;
  let fixture: ComponentFixture<PrecioCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioCompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
