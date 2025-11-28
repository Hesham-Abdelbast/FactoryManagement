import { CommonModule } from '@angular/common';
import { Component, Inject, Input, input, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    outcomeSummary: 'ملخص الصادر',
    transactions: 'المعاملات',
    totalAmount: 'إجمالي المبلغ',
    totalPaid: 'إجمالي المدفوع',
    totalRemaining: 'إجمالي المتبقي',
    totalQuantity: 'إجمالي الكمية',
    incomeByMaterial: 'الدخل حسب المادة',
    outcomeByMaterial: 'الصادر حسب المادة',
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

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) private dialogData: any) {}

  ngOnInit(): void {
    if (!this.data && this.dialogData) {
      this.data = this.dialogData.Items;
    }
  }
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
