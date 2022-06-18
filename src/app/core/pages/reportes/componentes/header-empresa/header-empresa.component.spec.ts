import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderEmpresaComponent } from './header-empresa.component';

describe('HeaderEmpresaComponent', () => {
  let component: HeaderEmpresaComponent;
  let fixture: ComponentFixture<HeaderEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
