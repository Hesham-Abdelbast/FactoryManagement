import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyServicesService {

  constructor() { }

  private dataUpdated = new Subject<void>();

  dataUpdated$ = this.dataUpdated.asObservable();

  notifyDataUpdate() {
    this.dataUpdated.next();
  }
}
