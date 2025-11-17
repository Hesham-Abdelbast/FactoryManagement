import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '../../../../../core/shared/toast.service';
import { EquipmentManagementService } from '../../../../../core/Equipments/equipment-management-service';
import { EquipmentExpenseDto } from '../../../../../model/Equipments/equipment-expense-dto';
import { EquipmentExpenseType } from '../../../../../model/Enums/equipment-expense-type';
import { CommonModule } from '@angular/common';
import { HModalComponent } from "../../../../../shared/Component/h-modal/h-modal.component";

@Component({
  selector: 'app-add-edit-equipment-expense',
  templateUrl: './add-edit-equipment-expense-component.html',
  styleUrls: ['./add-edit-equipment-expense-component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HModalComponent]
})
export class AddEditEquipmentExpenseComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  expenseTypes = Object.values(EquipmentExpenseType);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditEquipmentExpenseComponent>,
    private toast: ToastService,
    private service: EquipmentManagementService,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean, item?: EquipmentExpenseDto, equipmentId: string }
  ) { }

  ngOnInit(): void {
    this.isEditMode = this.data.isEdit;
    this.initForm();

    if (this.isEditMode && this.data.item) {
      this.form.patchValue(this.data.item);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      equipmentId: [this.data.equipmentId, Validators.required],
      type: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      note: ['']
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.toast.warning('الرجاء إدخال البيانات المطلوبة.');
      this.form.markAllAsTouched();
      return;
    }

    const model = this.isEditMode
      ? { ...this.data.item, ...this.form.value }
      : this.form.value;

    if (this.isEditMode) {
      this.service.UpdateEquipmentExpense(model).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success('تم تحديث المصروف');
            this.dialogRef.close(true);
          } else {
            this.toast.error(res.returnMsg);
          }
        },
        error: () => this.toast.error("⚠ حدث خطأ أثناء العملية")
      });
    }
    else {
      this.service.addEquipmentExpense(model).subscribe({
        next: (res) => {
          if (res.success) {
            this.toast.success('تمت إضافة المصروف');
            this.dialogRef.close(true);
          } else {
            this.toast.error(res.returnMsg);
          }
        },
        error: () => this.toast.error("⚠ حدث خطأ أثناء العملية")
      });
    }
  }
  close() {
    this.dialogRef.close();
  }
}
