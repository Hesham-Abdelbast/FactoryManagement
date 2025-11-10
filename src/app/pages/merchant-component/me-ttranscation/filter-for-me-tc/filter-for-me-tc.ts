import { Component } from '@angular/core';
import { HModalComponent } from "../../../../shared/Component/h-modal/h-modal.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-for-me-tc',
  imports: [HModalComponent, ReactiveFormsModule],
  templateUrl: './filter-for-me-tc.html',
  styleUrl: './filter-for-me-tc.scss',
})
export class FilterForMeTC {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FilterForMeTC>,

  ) {
    this.form = this.fb.group({
      from: [''],
      to: ['']
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (this.form.value.from && this.form.value.to && this.form.value.to < this.form.value.from) {
      alert('تاريخ النهاية يجب أن يكون بعد تاريخ البداية');
      return;
    }
    this.dialogRef.close(this.form.value);
    console.log(this.form.value, "form value");
  }
}
