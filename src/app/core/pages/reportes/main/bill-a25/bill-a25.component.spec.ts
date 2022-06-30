import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillA25Component } from './bill-a25.component';

describe('BillA25Component', () => {
  let component: BillA25Component;
  let fixture: ComponentFixture<BillA25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillA25Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillA25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
