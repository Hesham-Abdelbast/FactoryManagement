import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryEmploeeComponent } from './inventory-emploee-component';

describe('InventoryEmploeeComponent', () => {
  let component: InventoryEmploeeComponent;
  let fixture: ComponentFixture<InventoryEmploeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryEmploeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryEmploeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
