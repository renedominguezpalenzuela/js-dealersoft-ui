import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NettoKaufvertragExportComponent } from './netto-kaufvertrag-export.component';

describe('NettoKaufvertragExportComponent', () => {
  let component: NettoKaufvertragExportComponent;
  let fixture: ComponentFixture<NettoKaufvertragExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NettoKaufvertragExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NettoKaufvertragExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
