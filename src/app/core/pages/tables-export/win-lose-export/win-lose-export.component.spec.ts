import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinLoseExportComponent } from './win-lose-export.component';

describe('WinLoseExportComponent', () => {
  let component: WinLoseExportComponent;
  let fixture: ComponentFixture<WinLoseExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WinLoseExportComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinLoseExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
