import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStockComponent } from './my-stock.component';

describe('MyStockComponent', () => {
  let component: MyStockComponent;
  let fixture: ComponentFixture<MyStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyStockComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
