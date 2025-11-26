import { TestBed } from '@angular/core/testing';

import { FruityService } from './fruity.service';

describe('FruityService', () => {
  let service: FruityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FruityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
