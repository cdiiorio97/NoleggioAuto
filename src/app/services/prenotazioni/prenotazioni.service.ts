import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PRENOTAZIONI_MOCK } from '../../mock-data';
import { Prenotazione } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {

  constructor() { }

  getPrenotazioni(): Observable<any[]> {
    return of(PRENOTAZIONI_MOCK)
  }

  updatePrenotazione(prenotazione: Prenotazione): void {
    this.getPrenotazioni().subscribe(prenotazioni => {
      const index = prenotazioni.findIndex(elem => elem.id === prenotazione.id);
      if (index !== -1) {
        prenotazioni[index] = prenotazione;
      }
    });
  }
}
