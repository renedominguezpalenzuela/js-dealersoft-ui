import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterEmpresaComponent } from './footer-empresa.component';

describe('FooterEmpresaComponent', () => {
  let component: FooterEmpresaComponent;
  let fixture: ComponentFixture<FooterEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
