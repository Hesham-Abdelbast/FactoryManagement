import { Component } from '@angular/core';
import { EmployeesComponent } from "./employees-component/employees-component";
import { EquipmentComponent } from "./equipment-component/equipment-component";
import { FinancingComponent } from "./financing-component/financing-component";

@Component({
  selector: 'app-resource-management',
  imports: [EmployeesComponent, EquipmentComponent, FinancingComponent],
  templateUrl: './resource-management.html',
  styleUrl: './resource-management.scss',
})
export class ResourceManagement {

}
