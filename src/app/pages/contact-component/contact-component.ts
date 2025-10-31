import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactDto } from '../../model/Contact/contact-dto';
import { ContactService } from '../../core/Contact/contact-service';
import { ApiResponse } from '../../model/api-response';
import { ToastService } from '../../core/shared/toast.service';

@Component({
  selector: 'app-contact-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-component.html',
  styleUrls: ['./contact-component.scss'],
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  contactData: ContactDto | null = null;
  isEditing = false;
  isLoading = false;

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadContactData();
  }

  /** 🧱 إنشاء نموذج الاتصال */
  initializeForm(): void {
    this.contactForm = this.fb.group({
      id: [null],
      companyName: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.minLength(5)]],
      phone: ['', [Validators.pattern(/^[\+]?[0-9\s\-\(\)]{8,}$/)]],
      email: ['', [Validators.email]],
      website: ['', [Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/)]],
    });
  }

  /** 📦 تحميل بيانات الاتصال من الخادم */
  loadContactData(): void {
    this.isLoading = true;
    this.contactService.GetContact().subscribe({
      next: (res: ApiResponse<ContactDto>) => {
        this.isLoading = false;
        if (res.success && res.data) {
          this.contactData = res.data;
          this.contactForm.patchValue(this.contactData);
        } else {
          this.contactData = null;
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error('حدث خطأ أثناء تحميل البيانات ❌');
        console.error('Error loading contact data:', err);
      },
    });
  }

  /** ✏️ تفعيل وضع التعديل */
  startEditing(): void {
    this.isEditing = true;
    // إذا كانت هناك بيانات موجودة، نملأ النموذج
    if (this.contactData) {
      this.contactForm.patchValue(this.contactData);
    }
    // إذا لم تكن هناك بيانات، ننشئ نموذجاً جديداً
    else {
      this.contactForm.reset();
    }
  }

  /** ❌ إلغاء التعديل */
  cancelEditing(): void {
    this.isEditing = false;
    // نعيد تعبئة النموذج بالبيانات الأصلية إذا كانت موجودة
    if (this.contactData) {
      this.contactForm.patchValue(this.contactData);
    } else {
      this.contactForm.reset();
    }
    // نعيد تعيين حالة الحقول لتكون untouched
    this.contactForm.markAsPristine();
    Object.keys(this.contactForm.controls).forEach(key => {
      this.contactForm.get(key)?.markAsUntouched();
    });
  }

  /** 💾 حفظ أو تحديث بيانات الاتصال */
  saveContact(): void {
    if (this.contactForm.invalid) {
      this.markFormGroupTouched();
      this.toast.warning('الرجاء تعبئة الحقول المطلوبة بشكل صحيح ⚠️');
      return;
    }

    this.isLoading = true;
    const formData = this.contactForm.value;

    // نضمن أن الحقول الاختيارية الفارغة تكون null بدلاً من string فارغة
    Object.keys(formData).forEach(key => {
      if (formData[key] === '') {
        formData[key] = null;
      }
    });

    this.contactService.update(formData).subscribe({
      next: (res: ApiResponse<any>) => {
        this.isLoading = false;
        if (res.success) {
          this.contactData = formData;
          this.isEditing = false;
          this.contactForm.markAsPristine();
          this.toast.success('تم حفظ البيانات بنجاح ✅');
        } else {
          this.toast.error( 'فشل في حفظ البيانات ❌');
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.error('حدث خطأ أثناء الاتصال بالخادم ❌');
        console.error('Error saving contact data:', err);
      },
    });
  }

  /** 🧩 تعليم جميع الحقول كملامسة لإظهار الأخطاء */
  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach((key) => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  // 🧾 اختصارات الوصول للحقول
  get companyName() {
    return this.contactForm?.get('companyName');
  }
  get address() {
    return this.contactForm?.get('address');
  }
  get phone() {
    return this.contactForm?.get('phone');
  }
  get email() {
    return this.contactForm?.get('email');
  }
  get website() {
    return this.contactForm?.get('website');
  }
}