import { TestBed } from '@angular/core/testing';

import { UnitUserService } from './unit-user.service';

describe('UnitUserService', () => {
  let service: UnitUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
