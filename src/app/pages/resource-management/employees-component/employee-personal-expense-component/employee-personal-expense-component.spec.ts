import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePersonalExpenseComponent } from './employee-personal-expense-component';

describe('EmployeePersonalExpenseComponent', () => {
  let component: EmployeePersonalExpenseComponent;
  let fixture: ComponentFixture<EmployeePersonalExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePersonalExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePersonalExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
