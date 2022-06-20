import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioNettoComponent } from './precio-netto.component';

describe('PrecioNettoComponent', () => {
  let component: PrecioNettoComponent;
  let fixture: ComponentFixture<PrecioNettoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioNettoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioNettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
