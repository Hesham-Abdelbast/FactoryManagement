import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { WarehouseServices } from '../../../../core/Warehouse/warehouse-services';
import { ToastService } from '../../../../core/shared/toast.service';
import { WarehouseInventoryDto } from '../../../../model/Warehouse/warehouse-inventory-dto';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";


@Component({
  selector: 'app-warehouse-inventory-add-edit',
  templateUrl: './warehouse-inventory-add-edit-component.html',
  styleUrl: './warehouse-inventory-add-edit-component.scss',
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
})
export class WarehouseInventoryAddEditComponent implements OnInit {

 item: WarehouseInventoryDto | null = null;
  

  form!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private service: WarehouseServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<WarehouseInventoryAddEditComponent>,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.item = data?.item ?? null;
  }

  ngOnInit(): void {
    this.isEditMode = !!this.item;

    this.form = this.fb.group({
      id: [this.item?.id ?? null],
      warehouseId: [this.item?.warehouseId ?? null, Validators.required],
      materialTypeId: [this.item?.materialTypeId ?? null, Validators.required],
      currentQuantity: [this.item?.currentQuantity ?? 0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    const dto: WarehouseInventoryDto = this.form.value;

    if (this.isEditMode) {
      // this.service.update(dto).subscribe({
      //   next: () => {
      //     this.toast.success('تم التعديل بنجاح');
      //     this.dialogRef.close(true);
      //   },
      //   error: () => this.toast.error('فشل في عملية التعديل')
      // });
    } else {
      // this.service.create(dto).subscribe({
      //   next: () => {
      //     this.toast.success('تم الحفظ بنجاح');
      //     this.closeEvent.emit(true);
      //   },
      //   error: () => this.toast.error('فشل في عملية الحفظ')
      // });
    }
  }

  close() {
    this.dialogRef.close(false);
  }
}
