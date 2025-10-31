import { TestBed } from '@angular/core/testing';
import { MaterialTypeServices } from './material-type-services';


describe('MaterialTypeServices', () => {
  let service: MaterialTypeServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialTypeServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
