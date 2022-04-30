import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceExportComponent } from './invoice-export.component';

describe('InvoiceExportComponent', () => {
  let component: InvoiceExportComponent;
  let fixture: ComponentFixture<InvoiceExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvoiceExportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
