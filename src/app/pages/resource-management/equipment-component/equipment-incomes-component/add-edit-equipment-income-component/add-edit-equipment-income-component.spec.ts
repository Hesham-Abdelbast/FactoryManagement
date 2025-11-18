import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEquipmentIncomeComponent } from './add-edit-equipment-income-component';

describe('AddEditEquipmentIncomeComponent', () => {
  let component: AddEditEquipmentIncomeComponent;
  let fixture: ComponentFixture<AddEditEquipmentIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEquipmentIncomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEquipmentIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
