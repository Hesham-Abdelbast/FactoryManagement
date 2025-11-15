// equipment-management.service.ts
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { BaseServicesService } from '../shared/base-services.service';
import { ApiResponse } from '../../model/api-response';
import { EquipmentDto } from '../../model/Equipments/equipment-dto';
import { EquipmentManagementURLs } from '../../shared/helper/urls';
import { EquipmentExpenseDto } from '../../model/Equipments/equipment-expense-dto';
import { EquipmentIncomeDto } from '../../model/Equipments/equipment-income-dto';
import { ExpenseSummaryRequest } from '../../model/expense-summary-request';
import { EquipmentFinancialSummaryDto } from '../../model/Equipments/equipment-financial-summary-dto';
import { PaginationEntity } from '../../model/pagination-entity';

@Injectable({
  providedIn: 'root'
})
export class EquipmentManagementService {
  constructor(private baseService: BaseServicesService) {}

  // ---------------- Equipment CRUD ----------------

  // ============================================================
  // 📋 جلب جميع المعدات مع التصفية Pagination
  // ============================================================
  getAllEquipmentsWithPagination(param: PaginationEntity): Observable<ApiResponse<EquipmentDto[]>> {
    return this.baseService
      .PostRequest<ApiResponse<EquipmentDto[]>>(EquipmentManagementURLs.GetAll, param)
      .pipe(
        catchError(err =>
          this.handleError<EquipmentDto[]>('جلب جميع المعدات مع الصفحات', err, [])
        )
      );
  }
  getAllEquipments(): Observable<ApiResponse<EquipmentDto[]>> {
    return this.baseService.GetRequest<ApiResponse<EquipmentDto[]>>(EquipmentManagementURLs.GetAll)
      .pipe(catchError(err => this.handleError<EquipmentDto[]>('جلب جميع المعدات', err, [])));
  }

  getEquipmentById(id: string): Observable<ApiResponse<EquipmentDto>> {
    return this.baseService.GetRequest<ApiResponse<EquipmentDto>>(EquipmentManagementURLs.Get(id))
      .pipe(catchError(err => this.handleError<EquipmentDto>(`جلب بيانات المعدة بالمعرف ${id}`, err, null)));
  }

  addEquipment(dto: EquipmentDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(EquipmentManagementURLs.Create, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة معدة جديدة', err, null)));
  }

  updateEquipment(dto: EquipmentDto): Observable<ApiResponse<boolean>> {
    return this.baseService.PutRequest<ApiResponse<boolean>>(EquipmentManagementURLs.Update, dto)
      .pipe(catchError(err => this.handleError<boolean>('تحديث بيانات المعدة', err, null)));
  }

  deleteEquipment(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(EquipmentManagementURLs.Delete(id))
      .pipe(catchError(err => this.handleError<boolean>(`حذف المعدة بالمعرف ${id}`, err, false)));
  }

  // ---------------- Equipment Expenses ----------------
  addEquipmentExpense(dto: EquipmentExpenseDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(EquipmentManagementURLs.AddExpense, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة مصروف للمعدة', err, null)));
  }

  deleteEquipmentExpense(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(EquipmentManagementURLs.DeleteExpense(id))
      .pipe(catchError(err => this.handleError<boolean>(`حذف مصروف المعدة بالمعرف ${id}`, err, false)));
  }

  getEquipmentExpenses(equipmentId: string): Observable<ApiResponse<EquipmentExpenseDto[]>> {
    return this.baseService.GetRequest<ApiResponse<EquipmentExpenseDto[]>>(EquipmentManagementURLs.GetExpenses(equipmentId))
      .pipe(catchError(err => this.handleError<EquipmentExpenseDto[]>('جلب جميع مصاريف المعدة', err, [])));
  }

  // ---------------- Equipment Incomes ----------------
  addEquipmentIncome(dto: EquipmentIncomeDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(EquipmentManagementURLs.AddIncome, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة دخل للمعدة', err, null)));
  }

  deleteEquipmentIncome(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(EquipmentManagementURLs.DeleteIncome(id))
      .pipe(catchError(err => this.handleError<boolean>(`حذف دخل المعدة بالمعرف ${id}`, err, false)));
  }

  getEquipmentIncomes(equipmentId: string): Observable<ApiResponse<EquipmentIncomeDto[]>> {
    return this.baseService.GetRequest<ApiResponse<EquipmentIncomeDto[]>>(EquipmentManagementURLs.GetIncomes(equipmentId))
      .pipe(catchError(err => this.handleError<EquipmentIncomeDto[]>('جلب جميع دخول المعدة', err, [])));
  }

  // ---------------- Financial Summary ----------------
  getEquipmentFinancialSummary(equipmentId: string, request: ExpenseSummaryRequest): Observable<ApiResponse<EquipmentFinancialSummaryDto>> {
    return this.baseService.PostRequest<ApiResponse<EquipmentFinancialSummaryDto>>(
      `api/EquipmentManagement/FinancialSummary/${equipmentId}`, request
    ).pipe(
      catchError(err => this.handleError<EquipmentFinancialSummaryDto>(`جلب الملخص المالي للمعدة ${equipmentId}`, err, null))
    );
  }

  // 🔒 Centralized Arabic error handler
  private handleError<T>(context: string, error: any, fallbackData: T | null): Observable<ApiResponse<T>> {
    console.error(`خطأ أثناء ${context}:`, error);
    return of({
      success: false,
      data: fallbackData,
      returnMsg: `حدث خطأ أثناء ${context}`,
      returnCode: '',
      pageIndex: 0,
      pageSize: 0,
      totalCount: 0
    } as ApiResponse<T>);
  }
}
