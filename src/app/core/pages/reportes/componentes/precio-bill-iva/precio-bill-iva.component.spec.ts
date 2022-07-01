import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioBillIvaComponent } from './precio-bill-iva.component';

describe('PrecioBillIvaComponent', () => {
  let component: PrecioBillIvaComponent;
  let fixture: ComponentFixture<PrecioBillIvaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioBillIvaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioBillIvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
