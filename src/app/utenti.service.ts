import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UTENTI_MOCK } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  constructor() { }

  getUtenti():Observable<any[]>{
    return of(UTENTI_MOCK);
  }
}
