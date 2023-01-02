import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaufvertragExportComponent } from './kaufvertrag-export.component';

describe('KaufvertragExportComponent', () => {
  let component: KaufvertragExportComponent;
  let fixture: ComponentFixture<KaufvertragExportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaufvertragExportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaufvertragExportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
