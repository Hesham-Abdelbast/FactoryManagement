import { TestBed } from '@angular/core/testing';

import { MaterialType } from './material-type';

describe('MaterialType', () => {
  let service: MaterialType;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialType);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
