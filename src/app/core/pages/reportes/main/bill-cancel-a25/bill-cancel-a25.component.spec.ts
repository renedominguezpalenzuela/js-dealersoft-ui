import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillCancelA25Component } from './bill-cancel-a25.component';

describe('BillCancelA25Component', () => {
  let component: BillCancelA25Component;
  let fixture: ComponentFixture<BillCancelA25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillCancelA25Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillCancelA25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
