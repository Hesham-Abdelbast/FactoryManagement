import { TestBed } from '@angular/core/testing';

import { DriverManagmentServices } from './driver-managment-services';

describe('DriverManagmentServices', () => {
  let service: DriverManagmentServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverManagmentServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
