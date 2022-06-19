import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioNetoComponent } from './precio-neto.component';

describe('PrecioNetoComponent', () => {
  let component: PrecioNetoComponent;
  let fixture: ComponentFixture<PrecioNetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioNetoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioNetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
