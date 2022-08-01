import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UberSectionComponent } from './uber-section.component';

describe('UberSectionComponent', () => {
  let component: UberSectionComponent;
  let fixture: ComponentFixture<UberSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UberSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UberSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
