import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaufvertragIvaComponent } from './kaufvertrag-iva.component';

describe('KaufvertragIvaComponent', () => {
  let component: KaufvertragIvaComponent;
  let fixture: ComponentFixture<KaufvertragIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaufvertragIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaufvertragIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
