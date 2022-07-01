import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioBillA25Component } from './precio-bill-a25.component';

describe('PrecioBillA25Component', () => {
  let component: PrecioBillA25Component;
  let fixture: ComponentFixture<PrecioBillA25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioBillA25Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioBillA25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
