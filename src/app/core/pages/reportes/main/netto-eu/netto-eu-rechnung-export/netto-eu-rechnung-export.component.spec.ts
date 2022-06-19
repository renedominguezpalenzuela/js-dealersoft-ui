import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NettoEuRechnungExportComponent } from './netto-eu-rechnung-export.component';

describe('NettoEuRechnungExportComponent', () => {
  let component: NettoEuRechnungExportComponent;
  let fixture: ComponentFixture<NettoEuRechnungExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NettoEuRechnungExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NettoEuRechnungExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
