import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-result-inventory',
  imports: [CommonModule],
  templateUrl: './result-inventory.html',
  styleUrl: './result-inventory.scss',
})
export class ResultInventory {
  @Input() data: any;

  // Arabic text constants
  readonly arabicText = {
    title: 'نتائج الجرد',
    dateRange: 'نوفمبر 19, 2025 - نوفمبر 19, 2025',
    totalTransactions: 'إجمالي المعاملات',
    allTransactionsInPeriod: 'جميع المعاملات في الفترة',
    netQuantity: 'صافي الكمية',
    incomeMinusOutcome: 'الدخل - النفقات',
    totalImpurities: 'إجمالي الشوائب',
    average: 'متوسط',
    paymentStatus: 'حالة السداد',
    paid: 'مدفوع',
    unpaid: 'غير مدفوع',
    remaining: 'متبقي',
    incomeSummary: 'ملخص الدخل',
    outcomeSummary: 'ملخص النفقات',
    transactions: 'المعاملات',
    totalAmount: 'إجمالي المبلغ',
    totalPaid: 'إجمالي المدفوع',
    totalRemaining: 'إجمالي المتبقي',
    totalQuantity: 'إجمالي الكمية',
    incomeByMaterial: 'الدخل حسب المادة',
    outcomeByMaterial: 'النفقات حسب المادة',
    materialType: 'نوع المادة',
    quantity: 'الكمية',
    avgPrice: 'متوسط السعر',
    warehouseSummaries: 'ملخص المستودعات',
    warehouse: 'المستودع',
    topMerchants: 'أفضل التجار',
    merchant: 'التاجر',
    anomalies: 'الشذوذات',
    noDataAvailable: 'لا توجد بيانات متاحة',
    noAnomaliesDetected: 'لم يتم اكتشاف شذوذات',
    allTransactionsNormal: 'جميع المعاملات ضمن المعايير المتوقعة'
  };
  // Format date for Arabic display
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { month: 'long', day: 'numeric', year: 'numeric' });
  }
  // Formate Currency
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-LY', {
      style: 'currency',
      currency: 'LYD',
      minimumFractionDigits: 2
    }).format(amount);
  }
  // Get Arabic text
  get text() {
    return this.arabicText;
  }
}
