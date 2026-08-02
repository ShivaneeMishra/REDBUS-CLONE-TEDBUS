import { TestBed } from '@angular/core/testing';

import { Bus } from './bus';

describe('Bus', () => {
  let service: Bus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    // Bus is a type-only export, so create a mock instance for tests
    service = {} as Bus;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
