import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMerchant } from './add-edit-merchant';

describe('AddEditMerchant', () => {
  let component: AddEditMerchant;
  let fixture: ComponentFixture<AddEditMerchant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditMerchant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMerchant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
