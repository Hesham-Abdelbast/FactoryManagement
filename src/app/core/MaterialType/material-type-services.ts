import { Injectable } from '@angular/core';
import { Observable, of, catchError } from 'rxjs';
import { BaseServicesService } from '../shared/base-services.service';
import { MaterialTypeVM } from '../../model/MaterialType/material-type-vm';
import { ApiResponse } from '../../model/api-response';
import { MaterialTypeURLs } from '../../shared/helper/urls';

@Injectable({
  providedIn: 'root'
})
export class MaterialTypeServices {

  constructor(private baseService: BaseServicesService) {}

  /**
   * Fetch all material types
   */
  getAll(): Observable<ApiResponse<MaterialTypeVM[]>> {
    return this.baseService
      .GetRequest<ApiResponse<MaterialTypeVM[]>>(MaterialTypeURLs.GetAll)
      .pipe(
        catchError(error =>
          this.handleError<MaterialTypeVM[]>('fetching all material types', error, [])
        )
      );
  }

  /**
   * Fetch material type by ID
   */
  getById(id: string): Observable<ApiResponse<MaterialTypeVM>> {
    return this.baseService
      .GetRequest<ApiResponse<MaterialTypeVM>>(MaterialTypeURLs.GetByID(id))
      .pipe(
        catchError(error =>
          this.handleError<MaterialTypeVM>(
            `fetching material type by ID ${id}`,
            error,
            null
          )
        )
      );
  }

  /**
   * Add new material type
   */
  add(materialType: MaterialTypeVM): Observable<ApiResponse<string>> {
    return this.baseService
      .PostRequest<ApiResponse<string>>(MaterialTypeURLs.Add, materialType)
      .pipe(
        catchError(error =>
          this.handleError<string>('adding material type', error, null)
        )
      );
  }

  /**
   * Update existing material type
   */
  update(materialType: MaterialTypeVM): Observable<ApiResponse<boolean>> {
    return this.baseService
      .PutRequest<ApiResponse<boolean>>(MaterialTypeURLs.Update, materialType)
      .pipe(
        catchError(error =>
          this.handleError<boolean>('updating material type', error, null)
        )
      );
  }

  /**
   * Delete material type by ID
   */
  delete(id: string): Observable<ApiResponse<boolean>> {
    return this.baseService
      .DeleteRequest<ApiResponse<boolean>>(MaterialTypeURLs.Delete(id))
      .pipe(
        catchError(error =>
          this.handleError<boolean>(`deleting material type with ID ${id}`, error, false)
        )
      );
  }

  // 🔒 Centralized reusable error handler
  private handleError<T>(
    context: string,
    error: any,
    fallbackData: T | null
  ): Observable<ApiResponse<T>> {
    console.error(`Error ${context}:`, error);
    return of({
      success: false,
      data: fallbackData,
      returnMsg: `Failed while ${context}`,
      returnCode: '',
      pageIndex: 0,
      pageSize: 0,
      totalCount: 0
    } as ApiResponse<T>);
  }
}
