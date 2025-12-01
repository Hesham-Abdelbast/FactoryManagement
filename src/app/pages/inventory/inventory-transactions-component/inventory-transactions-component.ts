import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SystemInventoryServices } from '../../../core/SystemInventory/system-inventory-services';
import { ApiResponse } from '../../../model/api-response';
import { ResultInventory } from "./result-inventory/result-inventory";
import { WarehouseServices } from '../../../core/Warehouse/warehouse-services';
import { WarehouseDto } from '../../../model/Warehouse/warehouse-dto';
import { TrnxReportRequestDto } from '../../../model/SystemInventory/trnx-report-request-dto';

@Component({
  selector: 'app-inventory-transactions-component',
  imports: [ReactiveFormsModule, CommonModule, ResultInventory],
  templateUrl: './inventory-transactions-component.html',
  styleUrl: './inventory-transactions-component.scss',
})
export class InventoryTransactionsComponent implements OnInit{
  form!: FormGroup;
  result: any;
  warehouseLst:WarehouseDto[]=[]
  constructor(private fb: FormBuilder,
    private systemInventor:SystemInventoryServices,
    private warehouseServices:WarehouseServices) {
    this.form = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      metalType:[null],
      warehouseId:[null]
    });
  }

  ngOnInit(): void {
    this.getAllWarehouses();
  }
  getInventory() {
    if (this.form.invalid) return;
    const params:TrnxReportRequestDto = {
      from: this.form.value.fromDate,
      to: this.form.value.toDate,
      materialCategory:this.form.value.metalType,
      warehouseId:this.form.value.warehouseId,
    };

    this.systemInventor.GetTrnxReport(params).subscribe( (res:ApiResponse<any>) =>{
      if(res.success && res.data){
        this.result = res.data;
        console.log(res.data)
      }
    })
  }

  getAllWarehouses(){
    this.warehouseServices.getAll().subscribe( (res:ApiResponse<WarehouseDto[]>)=>{
      if(res.success && res.data){
        this.warehouseLst = res.data
      }
    } )
  }
}
