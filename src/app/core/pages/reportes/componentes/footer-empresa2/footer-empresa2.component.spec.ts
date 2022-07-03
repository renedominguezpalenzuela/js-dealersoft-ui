import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterEmpresa2Component } from './footer-empresa2.component';

describe('FooterEmpresa2Component', () => {
  let component: FooterEmpresa2Component;
  let fixture: ComponentFixture<FooterEmpresa2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterEmpresa2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterEmpresa2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
