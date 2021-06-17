import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, empty, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public addTaskSubject = new BehaviorSubject<any>(false);
  addTaskSubject$ = this.addTaskSubject.asObservable();
}
