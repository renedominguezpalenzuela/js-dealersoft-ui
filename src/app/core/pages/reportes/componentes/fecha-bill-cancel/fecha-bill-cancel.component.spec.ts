import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaBillCancelComponent } from './fecha-bill-cancel.component';

describe('FechaBillCancelComponent', () => {
  let component: FechaBillCancelComponent;
  let fixture: ComponentFixture<FechaBillCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FechaBillCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaBillCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
