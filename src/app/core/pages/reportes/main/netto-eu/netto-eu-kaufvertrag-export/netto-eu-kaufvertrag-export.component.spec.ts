import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NettoEuKaufvertragExportComponent } from './netto-eu-kaufvertrag-export.component';

describe('NettoEuKaufvertragExportComponent', () => {
  let component: NettoEuKaufvertragExportComponent;
  let fixture: ComponentFixture<NettoEuKaufvertragExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NettoEuKaufvertragExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NettoEuKaufvertragExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
