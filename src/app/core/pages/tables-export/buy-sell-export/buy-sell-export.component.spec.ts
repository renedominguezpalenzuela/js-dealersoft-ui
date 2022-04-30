import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellExportComponent } from './buy-sell-export.component';

describe('BuySellExportComponent', () => {
  let component: BuySellExportComponent;
  let fixture: ComponentFixture<BuySellExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuySellExportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
