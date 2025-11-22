import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CommonService } from '../../../../core/common-service';
import { TransactionTableComponent } from "../../../../shared/Component/transaction-table-component/transaction-table-component";

@Component({
  selector: 'app-inventory-result-merchant',
  imports: [CommonModule, TransactionTableComponent],
  templateUrl: './inventory-result-merchant.html',
  styleUrl: './inventory-result-merchant.scss',
})
export class InventoryResultMerchant {

  commonServices = inject(CommonService);
  @Input() merchantData: any;
 // Arabic translations
  translations = {
    title: 'إدارة مخزون التاجر',
    subtitle: 'عرض تفاصيل التاجر، الملخص المالي، وسجل المعاملات',
    totalSales: 'إجمالي المبيعات',
    totalExpenses: 'إجمالي المصروفات',
    netBalance: 'صافي الرصيد',
    recentTransactions: 'المعاملات الحديثة',
    expenseDetails: 'تفاصيل المصروفات',
    date: 'التاريخ',
    description: 'الوصف',
    amount: 'المبلغ',
    status: 'الحالة',
    category: 'الفئة',
    refreshData: 'تحديث البيانات',
    noTransactions: 'لا توجد معاملات',
    noExpenses: 'لا توجد مصروفات مسجلة',
    completed: 'مكتمل',
    processed: 'تم المعالجة',
    trxLen:'عدد المعاملات'
  };

  ngOnInit() {
    this.calculateNetBalance();
  }

  calculateNetBalance() {
    this.merchantData.netBalance = this.merchantData.totalSales - this.merchantData.totalExpenses;
  }

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
  }

  getAmountClass(amount: number): string {
    return amount >= 0 ? 'amount-positive' : 'amount-negative';
  }

  getStatus(type: string): string {
    return type === 'sale' ? this.translations.completed : this.translations.processed;
  }
}
