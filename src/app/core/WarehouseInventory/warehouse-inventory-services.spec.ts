import { TestBed } from '@angular/core/testing';

import { WarehouseInventoryServices } from './warehouse-inventory-services';

describe('WarehouseInventoryServices', () => {
  let service: WarehouseInventoryServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseInventoryServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
