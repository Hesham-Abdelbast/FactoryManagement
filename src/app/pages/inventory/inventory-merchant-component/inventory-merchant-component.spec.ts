import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryMerchantComponent } from './inventory-merchant-component';

describe('InventoryMerchantComponent', () => {
  let component: InventoryMerchantComponent;
  let fixture: ComponentFixture<InventoryMerchantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryMerchantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
