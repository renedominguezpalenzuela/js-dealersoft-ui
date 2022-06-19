import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungA25Component } from './rechnung-a25.component';

describe('RechnungA25Component', () => {
  let component: RechnungA25Component;
  let fixture: ComponentFixture<RechnungA25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechnungA25Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungA25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
