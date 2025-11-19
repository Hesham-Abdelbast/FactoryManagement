import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SystemInventoryServices } from '../../../core/SystemInventory/system-inventory-services';
import { ApiResponse } from '../../../model/api-response';
import { ResultInventory } from "./result-inventory/result-inventory";

@Component({
  selector: 'app-inventory-transactions-component',
  imports: [ReactiveFormsModule, CommonModule, ResultInventory],
  templateUrl: './inventory-transactions-component.html',
  styleUrl: './inventory-transactions-component.scss',
})
export class InventoryTransactionsComponent {
  form!: FormGroup;
  result: any;

  constructor(private fb: FormBuilder,
    private systemInventor:SystemInventoryServices) {
    this.form = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
    });
  }

  getInventory() {
    if (this.form.invalid) return;
    const params = {
      from: this.form.value.fromDate,
      to: this.form.value.toDate
    };

    this.systemInventor.GetTrnxReport(params.from,params.to).subscribe( (res:ApiResponse<any>) =>{
      if(res.success && res.data){
        this.result = res.data;
        console.log(res.data)
      }
    })
  }
}
