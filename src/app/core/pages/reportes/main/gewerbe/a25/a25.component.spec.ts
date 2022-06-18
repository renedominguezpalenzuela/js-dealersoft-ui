import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A25Component } from './a25.component';

describe('A25Component', () => {
  let component: A25Component;
  let fixture: ComponentFixture<A25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ A25Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(A25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
