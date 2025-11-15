import { TestBed } from '@angular/core/testing';

import { MerchantExpenseServices } from './merchant-expense-services';

describe('MerchantExpenseServices', () => {
  let service: MerchantExpenseServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantExpenseServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
