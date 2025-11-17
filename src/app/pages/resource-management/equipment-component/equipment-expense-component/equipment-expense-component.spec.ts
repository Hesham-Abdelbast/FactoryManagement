import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentExpenseComponent } from './equipment-expense-component';

describe('EquipmentExpenseComponent', () => {
  let component: EquipmentExpenseComponent;
  let fixture: ComponentFixture<EquipmentExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentExpenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
