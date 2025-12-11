import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  //return Date only
  formatDateOnly(dateTime: string): string {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    // Format dd/MM/yyyy
    return date.toLocaleDateString('en-GB');
  }

  formatForInputDate(date: string | undefined): string {
    if (!date) return '';
    return date.split('T')[0]; // yyyy-MM-dd
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-LY', {
      style: 'currency',
      currency: 'LYD',
      minimumFractionDigits: 0
    }).format(amount);
  }
}