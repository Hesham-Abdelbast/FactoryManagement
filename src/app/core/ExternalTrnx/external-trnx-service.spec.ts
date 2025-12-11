import { TestBed } from '@angular/core/testing';

import { ExternalTrnxService } from './external-trnx-service';

describe('ExternalTrnxService', () => {
  let service: ExternalTrnxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalTrnxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
