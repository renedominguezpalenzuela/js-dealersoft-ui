import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillIvaComponent } from './bill-iva.component';

describe('BillIvaComponent', () => {
  let component: BillIvaComponent;
  let fixture: ComponentFixture<BillIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
