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

  
}
