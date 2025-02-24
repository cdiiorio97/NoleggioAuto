import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AUTO_MOCK } from '../../mock-data';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor() { }

  getAutomobili() : Observable<any[]> {
    return of(AUTO_MOCK);
  }
}
