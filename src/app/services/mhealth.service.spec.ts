import { TestBed } from '@angular/core/testing';

import { MhealthService } from './mhealth.service';

describe('MhealthService', () => {
  let service: MhealthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MhealthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
