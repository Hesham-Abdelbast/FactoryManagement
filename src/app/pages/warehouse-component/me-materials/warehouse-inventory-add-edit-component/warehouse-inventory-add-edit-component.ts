import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { ToastService } from '../../../../core/shared/toast.service';
import { WarehouseInventoryDto } from '../../../../model/Warehouse/warehouse-inventory-dto';
import { CommonModule } from '@angular/common';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { MaterialTypeVM } from '../../../../model/MaterialType/material-type-vm';
import { WarehouseDto } from '../../../../model/Warehouse/warehouse-dto';
import { WarehouseInventoryServices } from '../../../../core/WarehouseInventory/warehouse-inventory-services';
import { ApiResponse } from '../../../../model/api-response';


@Component({
  selector: 'app-warehouse-inventory-add-edit',
  templateUrl: './warehouse-inventory-add-edit-component.html',
  styleUrl: './warehouse-inventory-add-edit-component.scss',
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
})
export class WarehouseInventoryAddEditComponent implements OnInit {

  item: WarehouseInventoryDto | null = null;
  materialTypeLst: MaterialTypeVM[] = [];
  warehouseLst: WarehouseDto[] = [];


  form!: FormGroup;
  isEditMode = false;

  constructor(
    private service: WarehouseInventoryServices,
    private fb: FormBuilder,
    private toast: ToastService,
    private dialogRef: MatDialogRef<WarehouseInventoryAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data?.item ?? null;
  }

  ngOnInit(): void {
    this.isEditMode = !!this.item;

    if (this.isEditMode) {
      this.form = this.fb.group({
        id: [this.item?.id ?? null],
        warehouseId: [{ value: this.item?.warehouseId ?? null, disabled: true }, Validators.required],
        materialTypeId: [{ value: this.item?.materialTypeId ?? null, disabled: true }, Validators.required],
        currentQuantity: [this.item?.currentQuantity ?? 0, [Validators.required, Validators.min(0)]]
      });
    }
    else {
      this.form = this.fb.group({
        warehouseId: ['', Validators.required],
        materialTypeId: ['', Validators.required],
        currentQuantity: [0, [Validators.required, Validators.min(0)]]
      });
    }

    this.materialTypeLst = this.data.materialTypeLst ?? [];
    this.warehouseLst = this.data.warehouseLst ?? [];
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const dto: WarehouseInventoryDto = this.form.value;
    console.log(dto);
    if (this.isEditMode) {
      this.service.update(dto).subscribe({
        next: (res: ApiResponse<boolean>) => {
          if (res.success) {
            this.toast.success('تم التعديل بنجاح');
            this.dialogRef.close(true);
          }
        },
        error: () => this.toast.error('فشل في عملية التعديل')
      });
    } else {
      this.service.add(dto).subscribe({
        next: (res: ApiResponse<string>) => {
          if (res.success) {
            this.toast.success('تم الحفظ بنجاح');
            this.dialogRef.close(true);
          }
        },
        error: () => this.toast.error('فشل في عملية الحفظ')
      });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
