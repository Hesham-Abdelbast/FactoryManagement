import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMaterialType } from './add-edit-material-type';

describe('AddEditMaterialType', () => {
  let component: AddEditMaterialType;
  let fixture: ComponentFixture<AddEditMaterialType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditMaterialType]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMaterialType);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
