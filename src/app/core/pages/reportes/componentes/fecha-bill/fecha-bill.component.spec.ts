import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaBillComponent } from './fecha-bill.component';

describe('FechaBillComponent', () => {
  let component: FechaBillComponent;
  let fixture: ComponentFixture<FechaBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechaBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
