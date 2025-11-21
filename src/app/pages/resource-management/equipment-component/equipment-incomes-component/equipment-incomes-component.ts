import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { HTableComponent } from '../../../../shared/Component/h-table/h-table.component';
import { PaginationEntity } from '../../../../model/pagination-entity';
import { TableAction } from '../../../../model/table-action';
import { ToastService } from '../../../../core/shared/toast.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiResponse } from '../../../../model/api-response';
import { PageEvent } from '../../../../model/page-event';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { EquipmentIncomeDto } from '../../../../model/Equipments/equipment-income-dto';
import { EquipmentManagementService } from '../../../../core/Equipments/equipment-management-service';
import { AddEditEquipmentIncomeComponent } from './add-edit-equipment-income-component/add-edit-equipment-income-component';

@Component({
  selector: 'app-equipment-incomes',
  imports: [HTableComponent, HModalComponent],
  templateUrl: './equipment-incomes-component.html',
  styleUrl: './equipment-incomes-component.scss',
})
export class EquipmentIncomesComponent implements OnInit {

  title: string = 'إيرادات المعدة ';
  data: EquipmentIncomeDto[] = [];

  pagination: PaginationEntity = {
    pageIndex: 1,
    pageSize: 5,
    totalCount: 0
  }

  equipmentId: string = '';

  /** Table Columns */
  columns = ['المبلغ', 'اسم المستأجر', 'ملاحظات'];
  columnKeys = ['amount', 'rentalName', 'note'];

  /** Table Actions */
  actions: TableAction[] = [
    { icon: 'fa fa-edit', label: 'تعديل', type: 'edit', style: 'btn btn-outline-success btn-sm' },
    { icon: 'fa fa-trash', label: 'حذف', type: 'delete', style: 'btn btn-outline-danger btn-sm' }
  ];

  constructor(
    private service: EquipmentManagementService,
    private toast: ToastService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<EquipmentIncomesComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.title += this.dialogData?.Name ?? '';
    if (this.dialogData?.Id)
      this.getAll();
  }

  getAll() {
    this.equipmentId = this.dialogData.Id;

    this.service.getEquipmentIncomes(this.equipmentId, this.pagination)
      .subscribe((res: ApiResponse<EquipmentIncomeDto[]>) => {
        if (res.success && res.data) {
          this.data = res.data;
          this.pagination.totalCount = res.totalCount;
          this.cdr.detectChanges();
        } else {
          this.toast.error(res.returnMsg);
        }
      });
  }

  onTableAction(event: { action: string; row: EquipmentIncomeDto }) {
    if (event.action === 'edit') this.openDialog(true, event.row);
    else if (event.action === 'delete') this.delete(event.row.id);
  }

  openDialog(isEdit: boolean, item?: EquipmentIncomeDto) {
    const dialogRef = this.dialog.open(AddEditEquipmentIncomeComponent, {
      width: '750px',
      data: { isEdit, item, equipmentId: this.equipmentId }
    });

    dialogRef.afterClosed().subscribe(res => res && this.getAll());
  }

  delete(id: string) {
    this.toast.confirm('هل تريد حذف الإيراد؟', 'نعم', 'إلغاء')
    .then((confirmed) => {
      if (confirmed) {
        this.service.deleteEquipmentIncome(id).subscribe(res => {
          res.success ? this.toast.success('تم الحذف بنجاح') : this.toast.error('فشل الحذف');
          this.getAll();
        });
      }
    });
  }

  onAdd() {
    this.openDialog(false);
  }

  /** Pagination */
  onPageChange(e: PageEvent) {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.getAll();
  }

  close() {
    this.dialogRef.close(false);
  }
}