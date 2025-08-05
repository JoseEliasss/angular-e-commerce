import { TestBed } from '@angular/core/testing';

import { RedirectIfLoggedInGuard } from './redirect-if-logged-in.guard';

describe('RedirectIfLoggedInGuard', () => {
  let service: RedirectIfLoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectIfLoggedInGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
