import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechnungIvaComponent } from './rechnung-iva.component';

describe('RechnungIvaComponent', () => {
  let component: RechnungIvaComponent;
  let fixture: ComponentFixture<RechnungIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechnungIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechnungIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
