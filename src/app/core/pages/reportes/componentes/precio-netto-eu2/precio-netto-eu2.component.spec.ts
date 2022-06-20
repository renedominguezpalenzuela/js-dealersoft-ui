import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioNettoEu2Component } from './precio-netto-eu2.component';

describe('PrecioNettoEu2Component', () => {
  let component: PrecioNettoEu2Component;
  let fixture: ComponentFixture<PrecioNettoEu2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioNettoEu2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioNettoEu2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
