import { Component } from '@angular/core';
import { InventoryTransactionsComponent } from "./inventory-transactions-component/inventory-transactions-component";
import { InventoryEmploeeComponent } from "./inventory-emploee-component/inventory-emploee-component";

@Component({
  selector: 'app-inventory',
  imports: [InventoryTransactionsComponent, InventoryEmploeeComponent],
  templateUrl: './inventory.html',
  styleUrl: './inventory.scss',
})
export class Inventory {

}
