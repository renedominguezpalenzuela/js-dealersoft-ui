import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioIvaComponent } from './precio-iva.component';

describe('PrecioIvaComponent', () => {
  let component: PrecioIvaComponent;
  let fixture: ComponentFixture<PrecioIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
