// employee-management.service.ts
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { BaseServicesService } from '../shared/base-services.service';
import { ApiResponse } from '../../model/api-response';
import { EmployeeDto } from '../../model/Employee/employee-dto';
import { EmployeeManagementURLs } from '../../shared/helper/urls';
import { EmployeeCashAdvanceDto } from '../../model/Employee/employee-cash-advance-dto';
import { EmployeePersonalExpenseDto } from '../../model/Employee/employee-personal-expense-dto';
import { EmployeeMonthlyPayrollDto } from '../../model/Employee/employee-monthly-payroll-dto';
import { EmployeeFinancialReportDto } from '../../model/Employee/employee-financial-report-dto';
import { PaginationEntity } from '../../model/pagination-entity';

@Injectable({
  providedIn: 'root'
})
export class EmployeeManagementService {
  constructor(private baseService: BaseServicesService) {}

  // ---------------- Employee CRUD ----------------
  getAllEmployeesWithPagination(param: PaginationEntity): Observable<ApiResponse<EmployeeDto[]>> {
  return this.baseService
    .PostRequest<ApiResponse<EmployeeDto[]>>(EmployeeManagementURLs.GetAll, param)
    .pipe(
      catchError(err =>
        this.handleError<EmployeeDto[]>('جلب جميع الموظفين مع الصفحات', err, [])
      )
    );
}

  getAllEmployees(): Observable<ApiResponse<EmployeeDto[]>> {
    return this.baseService.GetRequest<ApiResponse<EmployeeDto[]>>(EmployeeManagementURLs.GetAll)
      .pipe(catchError(err => this.handleError<EmployeeDto[]>('جلب جميع الموظفين', err, [])));
  }

  getEmployeeById(id: string): Observable<ApiResponse<EmployeeDto>> {
    return this.baseService.GetRequest<ApiResponse<EmployeeDto>>(EmployeeManagementURLs.Get(id))
      .pipe(catchError(err => this.handleError<EmployeeDto>(`جلب بيانات الموظف بالمعرف ${id}`, err, null)));
  }

  addEmployee(dto: EmployeeDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(EmployeeManagementURLs.Create, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة موظف', err, null)));
  }

  updateEmployee(dto: EmployeeDto): Observable<ApiResponse<boolean>> {
    return this.baseService.PutRequest<ApiResponse<boolean>>(EmployeeManagementURLs.Update, dto)
      .pipe(catchError(err => this.handleError<boolean>('تحديث بيانات الموظف', err, null)));
  }

  deleteEmployee(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(EmployeeManagementURLs.Delete(id))
      .pipe(catchError(err => this.handleError<boolean>(`حذف الموظف بالمعرف ${id}`, err, false)));
  }

  // ---------------- Cash Advance ----------------
  addCashAdvance(dto: EmployeeCashAdvanceDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(EmployeeManagementURLs.AddCashAdvance, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة سلفة مالية', err, null)));
  }

  deleteCashAdvance(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(EmployeeManagementURLs.DeleteCashAdvance(id))
      .pipe(catchError(err => this.handleError<boolean>(`حذف السلفة المالية بالمعرف ${id}`, err, false)));
  }

  getCashAdvances(employeeId: string,param: PaginationEntity): Observable<ApiResponse<EmployeeCashAdvanceDto[]>> {
    return this.baseService.PostRequest<ApiResponse<EmployeeCashAdvanceDto[]>>(EmployeeManagementURLs.GetCashAdvances(employeeId),param)
      .pipe(catchError(err => this.handleError<EmployeeCashAdvanceDto[]>('جلب جميع السلف المالية', err, [])));
  }
  UpdateEmployeeCashAdvance(dto: EmployeeCashAdvanceDto): Observable<ApiResponse<boolean>> {
    return this.baseService.PutRequest<ApiResponse<boolean>>(EmployeeManagementURLs.UpdateEmployeeCashAdvance, dto)
      .pipe(catchError(err => this.handleError<boolean>('تحديث بيانات الموظف', err, null)));
  }
  // ---------------- Personal Expense ----------------
  addPersonalExpense(dto: EmployeePersonalExpenseDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(EmployeeManagementURLs.AddPersonalExpense, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة مصروف شخصي', err, null)));
  }

  deletePersonalExpense(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(EmployeeManagementURLs.DeletePersonalExpense(id))
      .pipe(catchError(err => this.handleError<boolean>(`حذف المصروف الشخصي بالمعرف ${id}`, err, false)));
  }

  getPersonalExpenses(employeeId: string,param: PaginationEntity): Observable<ApiResponse<EmployeePersonalExpenseDto[]>> {
    return this.baseService.PostRequest<ApiResponse<EmployeePersonalExpenseDto[]>>(EmployeeManagementURLs.GetPersonalExpenses(employeeId),param)
      .pipe(catchError(err => this.handleError<EmployeePersonalExpenseDto[]>('جلب جميع المصاريف الشخصية', err, [])));
  }
  UpdatePersonalExpense(dto: EmployeePersonalExpenseDto): Observable<ApiResponse<boolean>> {
    return this.baseService.PutRequest<ApiResponse<boolean>>(EmployeeManagementURLs.UpdatePersonalExpense, dto)
      .pipe(catchError(err => this.handleError<boolean>('تحديث بيانات الموظف', err, null)));
  }
  // ---------------- Payroll ----------------
  generatePayroll(employeeId: string, year: number, month: number): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(EmployeeManagementURLs.GeneratePayroll(employeeId, year, month), null)
      .pipe(catchError(err => this.handleError<string>('توليد كشف الراتب', err, null)));
  }

  getPayroll(employeeId: string, year: number, month: number): Observable<ApiResponse<EmployeeMonthlyPayrollDto>> {
    return this.baseService.GetRequest<ApiResponse<EmployeeMonthlyPayrollDto>>(EmployeeManagementURLs.GetPayroll(employeeId, year, month))
      .pipe(catchError(err => this.handleError<EmployeeMonthlyPayrollDto>('جلب كشف الراتب', err, null)));
  }

  // ---------------- Reporting ----------------
  getEmployeeFinancialSummary(employeeId: string, from?: string, to?: string): Observable<ApiResponse<EmployeeFinancialReportDto>> {
    let url = EmployeeManagementURLs.FinancialReport(employeeId);
    if (from && to) {
      url += `?from=${from}&to=${to}`;
    }
    return this.baseService.GetRequest<ApiResponse<EmployeeFinancialReportDto>>(url)
      .pipe(catchError(err => this.handleError<EmployeeFinancialReportDto>('جلب التقرير المالي للموظف', err, null)));
  }

  // 🔒 Centralized reusable error handler
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
