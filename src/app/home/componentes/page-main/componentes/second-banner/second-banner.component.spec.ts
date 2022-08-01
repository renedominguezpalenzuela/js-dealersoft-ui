import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondBannerComponent } from './second-banner.component';

describe('SecondBannerComponent', () => {
  let component: SecondBannerComponent;
  let fixture: ComponentFixture<SecondBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
