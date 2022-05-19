import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainimgComponent } from './mainimg.component';

describe('MainimgComponent', () => {
  let component: MainimgComponent;
  let fixture: ComponentFixture<MainimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainimgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
