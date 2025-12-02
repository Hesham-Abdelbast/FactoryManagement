import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDriverExpenseComponent } from './add-edit-driver-expense-component';

describe('AddEditDriverExpenseComponent', () => {
  let component: AddEditDriverExpenseComponent;
  let fixture: ComponentFixture<AddEditDriverExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditDriverExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditDriverExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
