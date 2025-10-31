import { TestBed } from '@angular/core/testing';

import { MerchantServices } from './merchant-services';

describe('MerchantServices', () => {
  let service: MerchantServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
