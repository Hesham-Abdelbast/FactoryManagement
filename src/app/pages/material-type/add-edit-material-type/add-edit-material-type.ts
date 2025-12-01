import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/shared/toast.service';
import { MaterialTypeVM } from '../../../model/MaterialType/material-type-vm';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../../../model/api-response';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HModalComponent } from "../../../shared/Component/h-modal/h-modal.component";
import { MaterialTypeServices } from '../../../core/MaterialType/material-type-services';

@Component({
  selector: 'app-add-edit-material-type',
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './add-edit-material-type.html',
  styleUrl: './add-edit-material-type.scss',
})
export class AddEditMaterialType {
  materialTypeForm!: FormGroup;
  materialTypeId?: string;
  isEditMode = false;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private materialTypeService: MaterialTypeServices,
    private toast: ToastService,
    private dialogRef: MatDialogRef<AddEditMaterialType>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {

    if (this.data?.isEdit) {
      this.isEditMode = true;

      this.materialTypeForm = this.fb.group({
        name: [this.data.Item.name, [Validators.required, Validators.maxLength(50)]],
        description: [this.data.Item.description, [Validators.maxLength(200)]],
        type:[this.data.Item.type=='Iron'?'1':'2',Validators.required]
      });
    }
    else {
      this.materialTypeForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(50)]],
        description: ['', [Validators.maxLength(200)]],
        type: [null, Validators.required]
      });
    }
  }

  onSubmit(): void {
    if (this.materialTypeForm.invalid) return;

    const materialType: MaterialTypeVM = this.materialTypeForm.value;

    if (this.isEditMode) {
      this.update(materialType);
    } else {
      this.create(materialType);
    }
  }

  create(materialType: MaterialTypeVM): void {
    console.log(materialType)
    this.materialTypeService.add(materialType).subscribe((res: ApiResponse<string>) => {
      if (res.success && res.data) {
        this.toast.success('تم اضافه النوع بنجاح.');
        this.dialogRef.close(true)
      }
      else
        this.toast.error('فشل في إضافة نوع المادة.')
    });
  }

  update(materialType: MaterialTypeVM): void {
    materialType.id = this.data.Item.id;
    console.log(materialType)
    this.materialTypeService.update(materialType).subscribe((res: ApiResponse<boolean>) => {

      if (res.success) {
        this.toast.success('تم تعديل النوع بنجاح.');
        this.dialogRef.close(true);
      } else {
        console.log(res)
        this.toast.error('فشل في تحديث نوع المادة.');
      }

    });
  }

  close() {
    this.dialogRef.close(false);
  }
}
