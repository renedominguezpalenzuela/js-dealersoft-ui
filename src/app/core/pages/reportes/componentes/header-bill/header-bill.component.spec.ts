import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBillComponent } from './header-bill.component';

describe('HeaderBillComponent', () => {
  let component: HeaderBillComponent;
  let fixture: ComponentFixture<HeaderBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
