import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWarehouse } from './add-edit-warehouse';

describe('AddEditWarehouse', () => {
  let component: AddEditWarehouse;
  let fixture: ComponentFixture<AddEditWarehouse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditWarehouse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditWarehouse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
