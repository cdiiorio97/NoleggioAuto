import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEADERS_AUTO_MOCK, HEADERS_PRENOTAZIONI_MOCK, HEADERS_UTENTI_MOCK } from '../../mock-data';
import { MyHeaders } from '../../components/my-table/my-table-config';

@Injectable({
  providedIn: 'root'
})
export class TabellaService {

  constructor() { }

  getHeaders(tabella: string): Observable<MyHeaders[]>{
    switch(tabella){
      case "prenotazioni":
        return of(HEADERS_PRENOTAZIONI_MOCK.map(header => ({
          ...header,
          sorting: header.sorting as 'asc' | 'desc'
        })));
      case "utenti":
        return of(HEADERS_UTENTI_MOCK.map(header => ({
          ...header,
          sorting: header.sorting as 'asc' | 'desc'
        })))
      case "auto":
        return of(HEADERS_AUTO_MOCK.map(header => ({
          ...header,
          sorting: header.sorting as 'asc' | 'desc'
        })))
      default:
        return of(HEADERS_UTENTI_MOCK.map(header => ({
          ...header,
          sorting: header.sorting as 'asc' | 'desc'
        })))
    }
  }
}
