import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioNettoEuComponent } from './precio-netto-eu.component';

describe('PrecioNettoEuComponent', () => {
  let component: PrecioNettoEuComponent;
  let fixture: ComponentFixture<PrecioNettoEuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioNettoEuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioNettoEuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
