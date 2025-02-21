import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PRENOTAZIONI_MOCK } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  constructor() { }

  getPrenotazioni(): Observable<any[]> {
    return of(PRENOTAZIONI_MOCK)
  }
}
