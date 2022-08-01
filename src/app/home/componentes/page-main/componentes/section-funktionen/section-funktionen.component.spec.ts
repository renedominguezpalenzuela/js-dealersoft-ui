import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFunktionenComponent } from './section-funktionen.component';

describe('SectionFunktionenComponent', () => {
  let component: SectionFunktionenComponent;
  let fixture: ComponentFixture<SectionFunktionenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionFunktionenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFunktionenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
