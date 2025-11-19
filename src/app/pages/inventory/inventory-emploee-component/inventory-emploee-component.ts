import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HAutoCompleteComponent } from "../../../shared/Component/h-auto-complete/h-auto-complete";
import { CommonModule } from '@angular/common';
import { ResultInventoryEmployee } from "./result-inventory-employee/result-inventory-employee";
import { EmployeeManagementService } from '../../../core/Employees/employee-management-service';
import { ApiResponse } from '../../../model/api-response';
import { EmployeeDto } from '../../../model/Employee/employee-dto';
import { SystemInventoryServices } from '../../../core/SystemInventory/system-inventory-services';

export interface Employee {
  key: string;   // empId
  value: string; // empName
}

@Component({
  selector: 'app-inventory-emploee-component',
  templateUrl: './inventory-emploee-component.html',
  styleUrls: ['./inventory-emploee-component.scss'],
  imports: [HAutoCompleteComponent, CommonModule, ReactiveFormsModule, ResultInventoryEmployee],
})
export class InventoryEmploeeComponent implements OnInit {

  form!: FormGroup;
  result: any;

  employees: Employee[] = [];

  selectedEmployeeId?: string;

  constructor(
    private fb: FormBuilder,
    private employeeServices: EmployeeManagementService,
    private systemInventoryServices: SystemInventoryServices
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      employee: ['', Validators.required]
    });
    this.getAllEmployees();
  }

  onEmployeeSelected(empId: string) {
    this.selectedEmployeeId = empId;

    if (this.form.contains('employee')) {
      this.form.get('employee')?.setValue(empId);
    }
  }

  getInventory() {
    if (this.form.invalid) return;

    const payload = {
      fromDate: this.form.value.fromDate,
      toDate: this.form.value.toDate,
      empId: this.selectedEmployeeId
    };

    console.log('Inventory Payload:', payload);

    this.systemInventoryServices.GetEmployeeFullFinancialReport(payload.empId ?? '', payload.fromDate, payload.toDate)
      .subscribe((res: ApiResponse<any>) => {
        if (res.success && res.data) {
          this.result = res.data
        }
      })
  }

  private getAllEmployees(): void {
    this.employeeServices.getAllEmployees()
      .subscribe(
        (res: ApiResponse<EmployeeDto[]>) => {
          if (res.success && res.data?.length) {
            this.employees = res.data.map(e => ({ key: e.id, value: e.name } as Employee));
          } else {
            this.employees = [];
            console.warn('لا توجد موظفين للعرض');
          }
        },
        error => {
          this.employees = [];
          console.error('فشل تحميل قائمة الموظفين، يرجى المحاولة لاحقاً', error);
        }
      );
  }

}
