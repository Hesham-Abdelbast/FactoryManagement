import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseServicesService {

  private http = inject(HttpClient);

  GetRequest<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  PostRequest<T>(url: string, data: any): Observable<T> {
    console.log("post log data",data)
    return this.http.post<T>(url, data);
  }

  PutRequest<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data);
  }

  DeleteRequest<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
