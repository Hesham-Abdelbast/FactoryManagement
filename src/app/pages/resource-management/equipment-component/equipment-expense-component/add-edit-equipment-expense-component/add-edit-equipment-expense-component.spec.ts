import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEquipmentExpenseComponent } from './add-edit-equipment-expense-component';

describe('AddEditEquipmentExpenseComponent', () => {
  let component: AddEditEquipmentExpenseComponent;
  let fixture: ComponentFixture<AddEditEquipmentExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEquipmentExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEquipmentExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
