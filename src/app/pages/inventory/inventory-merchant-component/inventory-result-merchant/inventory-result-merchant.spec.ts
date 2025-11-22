import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryResultMerchant } from './inventory-result-merchant';

describe('InventoryResultMerchant', () => {
  let component: InventoryResultMerchant;
  let fixture: ComponentFixture<InventoryResultMerchant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryResultMerchant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryResultMerchant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
