import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HTableComponent } from '../../../../shared/Component/h-table/h-table.component';
import { EmployeeCashAdvanceDto } from '../../../../model/Employee/employee-cash-advance-dto';
import { PaginationEntity } from '../../../../model/pagination-entity';
import { TableAction } from '../../../../model/table-action';
import { EmployeeManagementService } from '../../../../core/Employees/employee-management-service';
import { ToastService } from '../../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from '../../../../model/api-response';
import { PageEvent } from '../../../../model/page-event';
import { AddEditExpenseCashComponent } from '../add-edit-expense-cash-component/add-edit-expense-cash-component';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";

@Component({
  selector: 'app-employee-cash-advance',
  imports: [HTableComponent, HModalComponent],
  templateUrl: './employee-cash-advance-component.html',
  styleUrl: './employee-cash-advance-component.scss',
})
export class EmployeeCashAdvanceComponent implements OnInit {
  title: string = 'السُلف والراتب الموظف '
  data: EmployeeCashAdvanceDto[] = [];
  pagination: PaginationEntity = {
    pageIndex: 1,
    pageSize: 5,
    totalCount: 0
  }
  empId: string = ''

  columns = ['المبلغ', 'النوع', 'تاريخ '];
  columnKeys = ['amount', 'type', 'createDate'];

  actions: TableAction[] = [
    { icon: 'fa fa-edit', label: 'تعديل', type: 'edit', style: 'btn btn-outline-success btn-sm' },
    { icon: 'fa fa-trash', label: 'حذف', type: 'delete', style: 'btn btn-outline-danger btn-sm' }
  ];

  constructor(
    private service: EmployeeManagementService,
    private toast: ToastService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EmployeeCashAdvanceComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.title += this.dialogData.Name;
    if (this.dialogData.Id)
      this.getAll();
  }

  getAll() {
    this.empId = this.dialogData.Id;

    this.service.getCashAdvances(this.empId, this.pagination).subscribe((res: ApiResponse<EmployeeCashAdvanceDto[]>) => {
      if (res.success && res.data) {
        this.data = res.data.map(item => ({
          ...item,
          createDate: item.createDate?.split('T')[0],
          type: item.typeOfCash === 'CashAdvance' ? 'سلفة مالية' : 'مرتب شهري'
        }));
        console.log(res)
        this.pagination.totalCount = res.totalCount;
        this.cdr.detectChanges();
      } else {
        this.toast.error(res.returnMsg);
      }
    });
  }

  onTableAction(event: { action: string; row: EmployeeCashAdvanceDto }) {
    if (event.action === 'edit') this.openDialog(true, event.row);
    else if (event.action === 'delete' && event.row.id) this.delete(event.row.id);
  }

  openDialog(isEdit: boolean, item?: EmployeeCashAdvanceDto) {
    const dialogRef = this.dialog.open(AddEditExpenseCashComponent, {
      width: '750px',
      data: { isEdit, type: 'cash', item }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAll();
        this.data = [...this.data];
      }
    });
  }

  delete(id: string) {
    this.toast.confirm('هل تريد حذف السلفة؟', 'نعم', 'إلغاء').then((confirmed) => {
      if (confirmed) {
        this.service.deleteCashAdvance(id).subscribe(res => {
          res.success ? this.toast.success('تم الحذف بنجاح') : this.toast.error('فشل الحذف');
          this.getAll();
        });
      }
    });
  }

  onAdd() {
    const dialogRef = this.dialog.open(AddEditExpenseCashComponent, {
      width: '750px',
      data: { isEdit: false, type: 'cash', employeeId: this.dialogData.Id }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.getAll();
        this.data = [...this.data];
      }
    });
  }

  onPageChange(e: PageEvent) {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.getAll();
  }

  close() {
    this.dialogRef.close(false);
  }
}
