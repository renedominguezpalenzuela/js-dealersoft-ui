import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioNetto2Component } from './precio-netto2.component';

describe('PrecioNetto2Component', () => {
  let component: PrecioNetto2Component;
  let fixture: ComponentFixture<PrecioNetto2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioNetto2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioNetto2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
