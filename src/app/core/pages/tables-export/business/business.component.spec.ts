import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessExportComponent } from './business.component';

describe('BuySellExportComponent', () => {
  let component: BusinessExportComponent;
  let fixture: ComponentFixture<BusinessExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessExportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
