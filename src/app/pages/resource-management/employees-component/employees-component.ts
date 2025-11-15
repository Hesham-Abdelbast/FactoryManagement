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

@Component({
  selector: 'app-employees-component',
  imports: [HTableComponent],
  templateUrl: './employees-component.html',
  styleUrl: './employees-component.scss',
})
export class EmployeesComponent implements OnInit {
  EmpsData :EmployeeDto[] = [];
  paginationEmp : PaginationEntity = {
    pageIndex : 1,
    pageSize : 10,
    totalCount:0
   }
 /** أعمدة الجدول */
  columns = ['الاسم', 'تاريخ بداء العمل' , 'المرتب'];
  columnKeys = ['name', 'startDate','baseSalary'];

  constructor(
    private EmpServices:EmployeeManagementService,
    private toast:ToastService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.GetAllEmps();
  }
/** إجراءات الجدول */
  actions: TableAction[] = [
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
    }
  }

  /** تغيير الصفحة */
  onPageChange(pageEvent: PageEvent) {
    const start = (pageEvent.pageIndex - 1) * pageEvent.pageSize;
    const end = start + pageEvent.pageSize;
    console.log(`عرض البيانات من ${start} إلى ${end}`);
  }

  editEmp(emp :EmployeeDto){

  }

  deleteEmp(id:string){

  }

  addEmps(){
    const dialogRef = this.dialog.open(AddEditEmployee, {
          width: '900px',
          height: 'auto'
        });
    
        dialogRef.afterClosed().subscribe(res => {
          if (res)
            this.GetAllEmps();
        });
  }

  GetAllEmps(){
    this.EmpServices.getAllEmployeesWithPagination(this.paginationEmp).subscribe( (res : ApiResponse<EmployeeDto[]>) =>{
      if(res.success && res.data){
          this.EmpsData = res.data
          this.paginationEmp.totalCount = res.data.length;
      }
      else{
        this.toast.error(res.returnMsg);
      }
    });
  }
}
