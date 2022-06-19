import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFechaComponent } from './invoice-fecha.component';

describe('InvoiceFechaComponent', () => {
  let component: InvoiceFechaComponent;
  let fixture: ComponentFixture<InvoiceFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFechaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
