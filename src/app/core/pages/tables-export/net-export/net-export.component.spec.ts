import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetExportComponent } from './net-export.component';

describe('BuySellExportComponent', () => {
  let component: NetExportComponent;
  let fixture: ComponentFixture<NetExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetExportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
