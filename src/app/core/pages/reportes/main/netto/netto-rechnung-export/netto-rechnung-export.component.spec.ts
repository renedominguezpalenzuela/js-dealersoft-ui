import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NettoRechnungExportComponent } from './netto-rechnung-export.component';

describe('NettoRechnungExportComponent', () => {
  let component: NettoRechnungExportComponent;
  let fixture: ComponentFixture<NettoRechnungExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NettoRechnungExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NettoRechnungExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
