import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleInvoicesComponent } from './multiple-invoices.component';

describe('MultipleInvoicesComponent', () => {
  let component: MultipleInvoicesComponent;
  let fixture: ComponentFixture<MultipleInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultipleInvoicesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
