import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintextoComponent } from './maintexto.component';

describe('MaintextoComponent', () => {
  let component: MaintextoComponent;
  let fixture: ComponentFixture<MaintextoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintextoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintextoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
