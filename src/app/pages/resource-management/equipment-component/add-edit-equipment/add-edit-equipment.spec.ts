import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditEquipment } from './add-edit-equipment';

describe('AddEditEquipment', () => {
  let component: AddEditEquipment;
  let fixture: ComponentFixture<AddEditEquipment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditEquipment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditEquipment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
