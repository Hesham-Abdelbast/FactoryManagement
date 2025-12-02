import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { BaseServicesService } from '../shared/base-services.service';
import { ApiResponse } from '../../model/api-response';
import { PaginationEntity } from '../../model/pagination-entity';
import { DriverDto } from '../../model/Drivers/driver-dto';
import { DriverManagementURLs } from '../../shared/helper/urls';
import { CreateTravelDto } from '../../model/Drivers/create-travel-dto';
import { TravelDto } from '../../model/Drivers/travel-dto';
import { CreateDriverExpenseDto } from '../../model/Drivers/create-driver-exponse-dto';
import { DriverExpenseDto } from '../../model/Drivers/driver-exponse-dto';


@Injectable({
  providedIn: 'root'
})
export class DriverManagmentServices {

  constructor(private baseService: BaseServicesService) {}

  // ---------- Driver CRUD ----------

  getAllDrivers(param: PaginationEntity): Observable<ApiResponse<DriverDto[]>> {
    return this.baseService.PostRequest<ApiResponse<DriverDto[]>>(DriverManagementURLs.GetAll, param)
      .pipe(catchError(err => this.handleError<DriverDto[]>('جلب السائقين', err, [])));
  }

  getDriverById(id: string): Observable<ApiResponse<DriverDto>> {
    return this.baseService.GetRequest<ApiResponse<DriverDto>>(DriverManagementURLs.Get(id))
      .pipe(catchError(err => this.handleError<DriverDto>('جلب السائق', err, null)));
  }

  addDriver(dto: DriverDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(DriverManagementURLs.Create, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة السائق', err, null)));
  }

  updateDriver(dto: DriverDto): Observable<ApiResponse<boolean>> {
    return this.baseService.PutRequest<ApiResponse<boolean>>(DriverManagementURLs.Update, dto)
      .pipe(catchError(err => this.handleError<boolean>('تعديل السائق', err, null)));
  }

  deleteDriver(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(DriverManagementURLs.Delete(id))
      .pipe(catchError(err => this.handleError<boolean>('حذف السائق', err, false)));
  }

  // ---------- Travels ----------

  addTravel(dto: CreateTravelDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(DriverManagementURLs.AddTravel, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة الرحلة', err, null)));
  }

  updateTravel(dto: CreateTravelDto): Observable<ApiResponse<boolean>> {
    return this.baseService.PutRequest<ApiResponse<boolean>>(DriverManagementURLs.UpdateTravel, dto)
      .pipe(catchError(err => this.handleError<boolean>('تعديل الرحلة', err, null)));
  }

  deleteTravel(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(DriverManagementURLs.DeleteTravel(id))
      .pipe(catchError(err => this.handleError<boolean>('حذف الرحلة', err, false)));
  }

  getAllTravels(param: PaginationEntity): Observable<ApiResponse<TravelDto[]>> {
    return this.baseService.PostRequest<ApiResponse<TravelDto[]>>(DriverManagementURLs.GetAllTravels, param)
      .pipe(catchError(err => this.handleError<TravelDto[]>('جلب الرحلات', err, [])));
  }
  getAllTravelsByDriverId(id:string,param: PaginationEntity): Observable<ApiResponse<TravelDto[]>> {
    return this.baseService.PostRequest<ApiResponse<TravelDto[]>>(DriverManagementURLs.GetAllTravelsByDriverId(id), param)
      .pipe(catchError(err => this.handleError<TravelDto[]>('جلب الرحلات', err, [])));
  }
  // ---------- Driver Expenses ----------

  addExpense(dto: CreateDriverExpenseDto): Observable<ApiResponse<string>> {
    return this.baseService.PostRequest<ApiResponse<string>>(DriverManagementURLs.AddExpense, dto)
      .pipe(catchError(err => this.handleError<string>('إضافة مصروف', err, null)));
  }

  updateExpense(dto: CreateDriverExpenseDto): Observable<ApiResponse<boolean>> {
    return this.baseService.PutRequest<ApiResponse<boolean>>(DriverManagementURLs.UpdateExpense, dto)
      .pipe(catchError(err => this.handleError<boolean>('تعديل المصروف', err, null)));
  }

  deleteExpense(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService.DeleteRequest<ApiResponse<boolean>>(DriverManagementURLs.DeleteExpense(id))
      .pipe(catchError(err => this.handleError<boolean>('حذف المصروف', err, false)));
  }

  getAllExpenses(param: PaginationEntity): Observable<ApiResponse<DriverExpenseDto[]>> {
    return this.baseService.PostRequest<ApiResponse<DriverExpenseDto[]>>(DriverManagementURLs.GetAllExpenses, param)
      .pipe(catchError(err => this.handleError<DriverExpenseDto[]>('جلب المصروفات', err, [])));
  }
  getAllExpensesByDriverId(id:string,param: PaginationEntity): Observable<ApiResponse<DriverExpenseDto[]>> {
    return this.baseService.PostRequest<ApiResponse<DriverExpenseDto[]>>(DriverManagementURLs.GetAllExpensesByDriverId(id), param)
      .pipe(catchError(err => this.handleError<DriverExpenseDto[]>('جلب المصروفات', err, [])));
  }
  // 🔥 Central error handler
  private handleError<T>(context: string, error: any, fallbackData: T | null): Observable<ApiResponse<T>> {
    console.error(`❌ خطأ أثناء ${context}:`, error);
    return of({
      success: false,
      data: fallbackData,
      returnMsg: `حدث خطأ أثناء: ${context}`,
      pageIndex: 0,
      pageSize: 0,
      totalCount: 0,
      returnCode: ''
    } as ApiResponse<T>);
  }
}
