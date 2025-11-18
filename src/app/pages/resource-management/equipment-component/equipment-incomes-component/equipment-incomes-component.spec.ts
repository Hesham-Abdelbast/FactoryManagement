import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentIncomesComponent } from './equipment-incomes-component';

describe('EquipmentIncomesComponent', () => {
  let component: EquipmentIncomesComponent;
  let fixture: ComponentFixture<EquipmentIncomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentIncomesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentIncomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
