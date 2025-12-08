import { ChangeDetectorRef, Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HTableComponent } from '../../../../shared/Component/h-table/h-table.component';
import { ToastService } from '../../../../core/shared/toast.service';
import { DriverManagmentServices } from '../../../../core/Drivers/driver-managment-services';
import { TravelDto } from '../../../../model/Drivers/travel-dto';
import { PaginationEntity } from '../../../../model/pagination-entity';
import { TableAction } from '../../../../model/table-action';
import { ApiResponse } from '../../../../model/api-response';
import { PageEvent } from '../../../../model/page-event';
import { AddEditTravelComponent } from './add-edit-travel-component/add-edit-travel-component';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { CommonService } from '../../../../core/common-service';

@Component({
  selector: 'app-travel-component',
  standalone: true,
  imports: [HTableComponent, HModalComponent],
  templateUrl: './travel-component.html',
  styleUrl: './travel-component.scss'
})
export class TravelComponent implements OnInit {

  private dialog = inject(MatDialog);
  private dialogRef = inject(MatDialogRef<TravelComponent>);
  private toast = inject(ToastService);
  private commonServices = inject(CommonService);
  private travelService = inject(DriverManagmentServices);
  private cdr = inject(ChangeDetectorRef);

  title = '';
  travels: TravelDto[] = [];

  pagination: PaginationEntity = { pageIndex: 1, pageSize: 5, totalCount: 0 };

  columns = ['من', 'المبلغ', 'التاريخ'];
  columnKeys = ['startLocation', 'amount', 'formattedDate'];

  actions: TableAction[] = [
    { type: 'edit', icon: 'fa fa-edit', label: 'تعديل', style: 'btn btn-outline-success btn-sm' },
    { type: 'delete', icon: 'fa fa-trash', label: 'حذف', style: 'btn btn-outline-danger btn-sm' }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = `رحلات السائق - ${this.data?.name ?? ''}`;
    this.loadData();
  }

  loadData() {
    this.travelService.getAllTravelsByDriverId(this.data?.driverId, this.pagination).subscribe({
      next: (res: ApiResponse<TravelDto[]>) => {
        if (res.success && res.data) {
          this.travels = res.data.map(item => ({
            ...item,
            formattedDate: this.commonServices.formatDateOnly(item.createDate)
          })) ?? [];
          this.pagination.totalCount = res.totalCount ?? 0;

          this.cdr.markForCheck();
          console.log(this.travels, 'res table DATA')
        }
      }
    });
  }

  onPageChange(e: PageEvent) {
    this.pagination.pageIndex = e.pageIndex;
    this.pagination.pageSize = e.pageSize;
    this.loadData();
  }

  onTableAction(ev: { action: string; row: TravelDto }) {
    if (ev.action === 'edit') this.editTravel(ev.row);
    else if (ev.action === 'delete') this.deleteTravel(ev.row.id!);
  }

  addTravel() {
    this.dialog.open(AddEditTravelComponent, {
      width: '60vw',
      height:'auto',
      maxHeight:'90vh',
      data: { driverId: this.data?.driverId }
    }).afterClosed().subscribe(r => r && this.loadData());
  }

  editTravel(row: TravelDto) {
    this.dialog.open(AddEditTravelComponent, {
      width: '60vw',
      height:'auto',
      maxHeight:'90vh',
      data: { item: row, driverId: this.data?.driverId }
    }).afterClosed().subscribe(r => r && this.loadData());
  }

  deleteTravel(id: string) {
    this.toast.confirm('هل تريد حذف الرحلة؟', 'نعم', 'إلغاء').then(ok => {
      if (ok) {
        this.travelService.deleteTravel(id).subscribe(res => {
          if (res.success) {
            this.toast.success('تم الحذف بنجاح');
            this.loadData();
          }
        });
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
