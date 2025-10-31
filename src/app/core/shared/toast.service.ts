import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private showToast(message: string, icon: SweetAlertIcon = 'info', position: 'top-end' | 'center' = 'top-end') {
    Swal.fire({
      toast: true,
      position: position,
      icon: icon,
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true
    });
  }

  success(message: string) {
    this.showToast(message, 'success');
  }

  error(message: string) {
    this.showToast(message, 'error', 'center');
  }

  warning(message: string) {
    this.showToast(message, 'warning');
  }

  info(message: string) {
    this.showToast(message, 'info');
  }

  /** Confirmation Dialog */
  confirm(message: string, confirmText: string, cancelText: string): Promise<boolean> {
    return Swal.fire({
      title: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then(result => result.isConfirmed);
  }
}
