import { TestBed } from '@angular/core/testing';

import { WarehouseServices } from './warehouse-services';

describe('WarehouseServices', () => {
  let service: WarehouseServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
