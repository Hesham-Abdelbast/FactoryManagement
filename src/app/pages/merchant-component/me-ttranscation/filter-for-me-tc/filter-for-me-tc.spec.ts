import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterForMeTC } from './filter-for-me-tc';

describe('FilterForMeTC', () => {
  let component: FilterForMeTC;
  let fixture: ComponentFixture<FilterForMeTC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterForMeTC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterForMeTC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
