import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatenschutComponent } from './datenschut.component';

describe('DatenschutComponent', () => {
  let component: DatenschutComponent;
  let fixture: ComponentFixture<DatenschutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatenschutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatenschutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
