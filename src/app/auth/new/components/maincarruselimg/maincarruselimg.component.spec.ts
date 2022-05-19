import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaincarruselimgComponent } from './maincarruselimg.component';

describe('MaincarruselimgComponent', () => {
  let component: MaincarruselimgComponent;
  let fixture: ComponentFixture<MaincarruselimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaincarruselimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaincarruselimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
