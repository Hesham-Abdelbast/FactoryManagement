import { Component } from '@angular/core';
import { ApiResponse } from '../../../model/api-response';
import { EquipmentDto } from '../../../model/Equipments/equipment-dto';
import { EquipmentManagementService } from '../../../core/Equipments/equipment-management-service';
import { ToastService } from '../../../core/shared/toast.service';
import { PaginationEntity } from '../../../model/pagination-entity';
import { MatDialog } from '@angular/material/dialog';
import { TableAction } from '../../../model/table-action';
import { PageEvent } from '../../../model/page-event';
import { HTableComponent } from "../../../shared/Component/h-table/h-table.component";

@Component({
  selector: 'app-equipment-component',
  imports: [HTableComponent],
  templateUrl: './equipment-component.html',
  styleUrl: './equipment-component.scss',
})
export class EquipmentComponent {
 eqpsData :EquipmentDto[] = [];
  paginationeqps : PaginationEntity = {
    pageIndex : 1,
    pageSize : 10,
    totalCount:0
   }
 /** أعمدة الجدول */
  columns = ['اسم المعدة', 'نوع المعدة' ];
  columnKeys = ['name', 'category'];

  constructor(
    private eqpServices:EquipmentManagementService,
    private toast:ToastService,
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.GetAllEquipment();
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
  onTableAction(event: { action: string; row: EquipmentDto }) {
    switch (event.action) {
      case 'edit':
        this.editeqps(event.row);
        break;
      case 'delete':
        this.deleteeqps(event.row.id);
        break;
    }
  }

  /** تغيير الصفحة */
  onPageChange(pageEvent: PageEvent) {
    this.paginationeqps.pageIndex = pageEvent.pageIndex;
    this.paginationeqps.pageSize = pageEvent.pageIndex;
    this.GetAllEquipment();
  }


  editeqps(eqps :EquipmentDto){

  }

  deleteeqps(id:string){

  }

  addEqps(){

  }

  GetAllEquipment(){
    this.eqpServices.getAllEquipmentsWithPagination(this.paginationeqps).subscribe( (res : ApiResponse<EquipmentDto[]>) =>{
      if(res.success){
        if(res.data && res.data.length>0){
          this.eqpsData = res.data
        }
        else{
          this.toast.warning('لا توجد بيانات عمال...!')
        }
      }
      else{
        this.toast.error(res.returnMsg);
      }
    });
  }
}
