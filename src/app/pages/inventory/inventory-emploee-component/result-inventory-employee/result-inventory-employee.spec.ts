import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultInventoryEmployee } from './result-inventory-employee';

describe('ResultInventoryEmployee', () => {
  let component: ResultInventoryEmployee;
  let fixture: ComponentFixture<ResultInventoryEmployee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultInventoryEmployee]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultInventoryEmployee);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
