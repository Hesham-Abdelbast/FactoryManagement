import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { HModalComponent } from '../../../shared/Component/h-modal/h-modal.component';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction-component.html',
  styleUrl: './view-transaction-component.scss',
  imports: [CommonModule, HModalComponent],
  standalone: true
})
export class ViewTransactionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ViewTransactionComponent>
  ) {}

  close() {
    this.dialogRef.close();
  }
}
