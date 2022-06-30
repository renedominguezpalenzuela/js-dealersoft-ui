import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInvoicesComponent } from './tabla-invoices.component';

describe('TablaInvoicesComponent', () => {
  let component: TablaInvoicesComponent;
  let fixture: ComponentFixture<TablaInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
