import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-inventory-result-merchant',
  imports: [CommonModule],
  templateUrl: './inventory-result-merchant.html',
  styleUrl: './inventory-result-merchant.scss',
})
export class InventoryResultMerchant {
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
    processed: 'تم المعالجة'
  };

  ngOnInit() {
    this.calculateNetBalance();
  }

  calculateNetBalance() {
    this.merchantData.netBalance = this.merchantData.totalSales - this.merchantData.totalExpenses;
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
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
