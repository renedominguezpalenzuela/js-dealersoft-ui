import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KaufvertragA25Component } from './kaufvertrag-a25.component';

describe('KaufvertragA25Component', () => {
  let component: KaufvertragA25Component;
  let fixture: ComponentFixture<KaufvertragA25Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KaufvertragA25Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KaufvertragA25Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
