import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCancelIvaComponent } from './bill-cancel-iva.component';

describe('BillCancelIvaComponent', () => {
  let component: BillCancelIvaComponent;
  let fixture: ComponentFixture<BillCancelIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCancelIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCancelIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
