import { TestBed } from '@angular/core/testing';

import { UnitSharedService } from './unit-shared.service';

describe('UnitSharedService', () => {
  let service: UnitSharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitSharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
