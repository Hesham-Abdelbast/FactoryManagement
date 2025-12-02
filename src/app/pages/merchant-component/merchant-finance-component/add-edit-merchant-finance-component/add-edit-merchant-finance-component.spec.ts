import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMerchantFinanceComponent } from './add-edit-merchant-finance-component';

describe('AddEditMerchantFinanceComponent', () => {
  let component: AddEditMerchantFinanceComponent;
  let fixture: ComponentFixture<AddEditMerchantFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditMerchantFinanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditMerchantFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
