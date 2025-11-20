import { TestBed } from '@angular/core/testing';

import { WarehouseExpenseServices } from './warehouse-expense-services';

describe('WarehouseExpenseServices', () => {
  let service: WarehouseExpenseServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseExpenseServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
