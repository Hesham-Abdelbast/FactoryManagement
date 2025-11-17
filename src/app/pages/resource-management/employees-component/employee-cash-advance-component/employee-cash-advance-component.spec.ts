import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCashAdvanceComponent } from './employee-cash-advance-component';

describe('EmployeeCashAdvanceComponent', () => {
  let component: EmployeeCashAdvanceComponent;
  let fixture: ComponentFixture<EmployeeCashAdvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeCashAdvanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeCashAdvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
