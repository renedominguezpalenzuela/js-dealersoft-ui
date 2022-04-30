import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStockExportComponent } from './my-stock-export.component';

describe('MyStockExportComponent', () => {
  let component: MyStockExportComponent;
  let fixture: ComponentFixture<MyStockExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyStockExportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStockExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
