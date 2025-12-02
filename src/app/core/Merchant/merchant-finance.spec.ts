import { TestBed } from '@angular/core/testing';

import { MerchantFinance } from './merchant-finance';

describe('MerchantFinance', () => {
  let service: MerchantFinance;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantFinance);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
