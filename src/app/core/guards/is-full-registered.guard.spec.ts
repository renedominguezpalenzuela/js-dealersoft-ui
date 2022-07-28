import { TestBed } from '@angular/core/testing';

import { IsFullRegisteredGuard } from './is-full-registered.guard';

describe('IsFullRegisteredGuard', () => {
  let guard: IsFullRegisteredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsFullRegisteredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
