import { Component, OnInit } from '@angular/core';
import { EmployeeManagementService } from '../../../core/Employees/employee-management-service';
import { PaginationEntity } from '../../../model/pagination-entity';
import { ApiResponse } from '../../../model/api-response';
import { EmployeeDto } from '../../../model/Employee/employee-dto';
import { ToastService } from '../../../core/shared/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { TableAction } from '../../../model/table-action';
import { PageEvent } from '../../../model/page-event';
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";
import { AddEditEmployee } from './add-edit-employee/add-edit-employee';
import { EmployeePersonalExpenseComponent } from './employee-personal-expense-component/employee-personal-expense-component';
import { EmployeeCashAdvanceComponent } from './employee-cash-advance-component/employee-cash-advance-component';
import { MonthlyPayrollComponent } from './monthly-payroll-component/monthly-payroll-component';

@Component({
  selector: 'app-employees-component',
  imports: [HTableComponent],
  templateUrl: './employees-component.html',
  styleUrl: './employees-component.scss',
})
export class EmployeesComponent implements OnInit {
  EmpsData: EmployeeDto[] = [];
  paginationEmp: PaginationEntity = {
    pageIndex: 1,
    pageSize: 5,
    totalCount: 0
  }
  /** أعمدة الجدول */
  columns = ['الاسم', 'تاريخ بداء العمل', 'المرتب'];
  columnKeys = ['name', 'startDate', 'baseSalary'];

  constructor(
    private EmpServices: EmployeeManagementService,
    private toast: ToastService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.GetAllEmps();
  }
  /** إجراءات الجدول */
  actions: TableAction[] = [
    {
      icon: 'fa fa-edit',
      iconColor: '',
      label: 'المصريف الشخصية',
      type: 'PersonalExpense',
      style: 'btn btn-outline-primary btn-sm'
    },
    {
      icon: 'fa fa-edit',
      iconColor: '',
      label: 'السُلف والراتب',
      type: 'CashAdvance',
      style: 'btn btn-outline-primary btn-sm'
    }
    ,
    {
      icon: 'fa fa-edit',
      iconColor: '',
      label: 'كشف الرواتب',
      type: 'Repayment',
      style: 'btn btn-outline-primary btn-sm'
    },
    {
      icon: 'fa fa-edit',
      iconColor: '',
      label: 'تعديل',
      type: 'edit',
      style: 'btn btn-outline-success btn-sm'
    },
    {
      icon: 'fa fa-trash',
      iconColor: '',
      label: 'حذف',
      type: 'delete',
      style: 'btn btn-outline-danger btn-sm'
    }
  ];

  /** التعامل مع الأحداث من الجدول */
  onTableAction(event: { action: string; row: EmployeeDto }) {
    switch (event.action) {
      case 'edit':
        this.editEmp(event.row);
        break;
      case 'delete':
        this.deleteEmp(event.row.id);
        break;
      case 'CashAdvance':
        this.CashAdvance(event.row.id,event.row.name);
        break;
      case 'PersonalExpense':
        this.PersonalExpense(event.row.id,event.row.name);
        break;
      case 'Repayment':
        this.Repayment(event.row);
        break;
    }
  }

  /** تغيير الصفحة */
  onPageChange(pageEvent: PageEvent) {
    this.paginationEmp.pageIndex = pageEvent.pageIndex;
    this.paginationEmp.pageSize = pageEvent.pageSize;
    this.GetAllEmps();
  }

  PersonalExpense(id: string , name:string) {
  this.dialog.open(EmployeePersonalExpenseComponent, {
    width: '1000px',          
    height: 'auto',
    maxHeight: '90vh',
    maxWidth: '90vw',
    data: { Id: id,Name:name }         
  });
}
Repayment(row: EmployeeDto) {
  this.dialog.open(MonthlyPayrollComponent, {
    width: '1000px',          
    height: 'auto',
    maxHeight: '90vh',
    maxWidth: '90vw',
    data: { Employee : row}         
  });
}
  CashAdvance(employeeId: string,name:string) {
  this.dialog.open(EmployeeCashAdvanceComponent, {
    width: '900px',
    height: 'auto',
    maxHeight: '90vh',
    maxWidth: '90vw',
    data: { Id: employeeId ,Name:name}
  });
}


  editEmp(emp: EmployeeDto) {
    const dialogRef = this.dialog.open(AddEditEmployee, {
      width: '900px',
      height: 'auto',
      data: { isEdit: true, Item: emp }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.GetAllEmps();
    });
  }

  deleteEmp(id: string) {
    this.toast.confirm('هل أنت متأكد من حذف هذا العامل', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.EmpServices.deleteEmployee(id).subscribe((res: ApiResponse<boolean>) => {
          if (res.success) {
            this.toast.success('تم حذف العامل بنجاح.');
            this.GetAllEmps();
          } else {
            this.toast.error('فشل حذف العامل.');
          }
        });
      }
    });
  }

  addEmps() {
    const dialogRef = this.dialog.open(AddEditEmployee, {
      width: '900px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res)
        this.GetAllEmps();
    });
  }

  GetAllEmps() {
    this.EmpServices.getAllEmployeesWithPagination(this.paginationEmp).subscribe((res: ApiResponse<EmployeeDto[]>) => {
      if (res.success && res.data) {
        this.EmpsData = res.data
        this.paginationEmp.totalCount = res.totalCount ?? 0;
      }
      else {
        this.toast.error(res.returnMsg);
      }
    });
  }
}
