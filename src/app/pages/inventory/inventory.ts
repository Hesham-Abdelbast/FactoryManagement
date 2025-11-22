import { Component } from '@angular/core';
import { InventoryTransactionsComponent } from "./inventory-transactions-component/inventory-transactions-component";
import { InventoryEmploeeComponent } from "./inventory-emploee-component/inventory-emploee-component";
import { InventoryMerchantComponent } from "./inventory-merchant-component/inventory-merchant-component";

@Component({
  selector: 'app-inventory',
  imports: [InventoryTransactionsComponent, InventoryEmploeeComponent, InventoryMerchantComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {

}
