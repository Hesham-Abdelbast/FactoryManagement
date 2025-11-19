import { TestBed } from '@angular/core/testing';

import { SystemInventoryServices } from './system-inventory-services';

describe('SystemInventoryServices', () => {
  let service: SystemInventoryServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemInventoryServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
