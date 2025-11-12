import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseInventoryAddEditComponent } from './warehouse-inventory-add-edit-component';

describe('WarehouseInventoryAddEditComponent', () => {
  let component: WarehouseInventoryAddEditComponent;
  let fixture: ComponentFixture<WarehouseInventoryAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WarehouseInventoryAddEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseInventoryAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
