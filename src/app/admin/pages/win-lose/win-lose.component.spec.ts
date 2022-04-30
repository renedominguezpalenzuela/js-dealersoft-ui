import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinLoseComponent } from './win-lose.component';

describe('WinLoseComponent', () => {
  let component: WinLoseComponent;
  let fixture: ComponentFixture<WinLoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WinLoseComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinLoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
