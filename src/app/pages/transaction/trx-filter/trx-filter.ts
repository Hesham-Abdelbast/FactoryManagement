import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/shared/toast.service';
import { TransactionDto } from '../../../model/Transaction/transaction-dto';
import { TxnSearchDto } from '../../../model/Transaction/txn-search-dto';
import { MatDialogRef } from '@angular/material/dialog';
import { HModalComponent } from "../../../shared/Component/h-modal/h-modal.component";


@Component({
  selector: 'app-trx-filter',
  imports: [CommonModule, ReactiveFormsModule, HModalComponent],
  templateUrl: './trx-filter.html',
  styleUrl: './trx-filter.scss',
})
export class TrxFilter implements OnInit {
  searchForm!: FormGroup;
  transactions: TransactionDto[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private dialogRef: MatDialogRef<TrxFilter>,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.searchForm = this.fb.group({
      fromDate: [Date],
      toDate: [Date],
      merchantName: [''],
      materialTypeName: [''],
      warehouseName: [''],
      pageIndex: [1],
      pageSize: [10]
    });
  }

  onSearch(): void {
    const searchData: TxnSearchDto = this.searchForm.value;
    this.dialogRef.close(searchData);
    console.log('Search Data:', searchData);
  }

  onReset(): void {
    this.searchForm.reset({
      pageIndex: 1,
      pageSize: 20
    });
    this.transactions = [];
  }
  close(): void {
    this.dialogRef.close();
  }
}
