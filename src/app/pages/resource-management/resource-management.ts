import { Component } from '@angular/core';
import { EmployeesComponent } from "./employees-component/employees-component";
import { EquipmentComponent } from "./equipment-component/equipment-component";
import { FinancingComponent } from "./financing-component/financing-component";
import { CommonModule } from '@angular/common';
import { DriversComponent } from "./drivers-component/drivers-component";
import { MaterialType } from "../material-type/material-type";
import { WarehouseComponent } from "../warehouse-component/warehouse-component";

@Component({
  selector: 'app-resource-management',
  imports: [EmployeesComponent, EquipmentComponent, FinancingComponent, CommonModule, DriversComponent, MaterialType, WarehouseComponent],
  templateUrl: './resource-management.html',
  styleUrl: './resource-management.scss',
})
export class ResourceManagement {
  activeTab: 'workers' | 'tools' | 'financing' | 'drivers' | 'metals' | 'store'= 'metals';

  setTab(tab: any) {
    this.activeTab = tab;
  }
}
