import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditExpenseCashComponent } from './add-edit-expense-cash-component';

describe('AddEditExpenseCashComponent', () => {
  let component: AddEditExpenseCashComponent;
  let fixture: ComponentFixture<AddEditExpenseCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditExpenseCashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditExpenseCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
