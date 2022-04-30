import { TestBed } from '@angular/core/testing';

import { TrialExpiredGuard } from './trial-expired.guard';

describe('TrialExpiredGuard', () => {
  let guard: TrialExpiredGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TrialExpiredGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
