import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerBlackComponent } from './banner-black.component';

describe('BannerBlackComponent', () => {
  let component: BannerBlackComponent;
  let fixture: ComponentFixture<BannerBlackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerBlackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerBlackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
