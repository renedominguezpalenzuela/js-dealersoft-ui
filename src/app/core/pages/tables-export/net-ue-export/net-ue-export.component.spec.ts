import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetUeExportComponent } from './net-ue-export.component';

describe('BuySellExportComponent', () => {
  let component: NetUeExportComponent;
  let fixture: ComponentFixture<NetUeExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetUeExportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetUeExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
