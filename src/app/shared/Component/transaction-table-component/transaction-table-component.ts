import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDto } from '../../../model/Transaction/transaction-dto';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-table-component.html',
  styleUrl: './transaction-table-component.scss',
})
export class TransactionTableComponent {

  @Input() pageSize: number = 15;
  currentPage: number = 1;

  get pagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  get totalPages() {
    return Math.ceil(this.data.length / this.pageSize);
  }

  @Input() data: any[] = [];
  
}
