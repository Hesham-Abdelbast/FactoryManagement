import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HModalComponent } from "../../../shared/Component/h-modal/h-modal.component";

@Component({
  selector: 'app-trx-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './trx-filter.html',
  styleUrls: ['./trx-filter.scss'],
})
export class TrxFilter implements OnInit {

  searchForm!: FormGroup;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<TrxFilter>) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      merchantName: [''],
      materialTypeName: [''],
      warehouseName: [''],
      fromDate: [null],
      toDate: [null],
      isPaid: [null],
      isUnPaid: [null],
    });
  }

  onSearch(): void {
    this.dialogRef.close(this.searchForm.value);
  }

  onReset(): void {
    this.searchForm.reset({
      paid: null,
      unpaid: null
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
