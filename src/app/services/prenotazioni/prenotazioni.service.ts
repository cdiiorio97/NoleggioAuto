import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PRENOTAZIONI_MOCK, RICHIESTE_PRENOTAZIONI_MOCK } from '../../mock-data';
import { Prenotazione } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {
  prenotazioni: Observable<Prenotazione[]> | undefined;
  richiestePrenotazioni: Observable<Prenotazione[]> | undefined
  constructor() { }

  getPrenotazioni(): Observable<any[]> {
    return this.prenotazioni = of(PRENOTAZIONI_MOCK)
  }

  addPrenotazione(newPren: any){
    if (!this.prenotazioni) {
      this.prenotazioni = of([]);
    }
    else {
      this.getPrenotazioni().subscribe(pren => {
        pren.unshift(newPren);
        this.prenotazioni = of(pren);
      });
    };
  }

  updatePrenotazione(prenotazione: Prenotazione): void {
    this.getPrenotazioni().subscribe(prenotazioni => {
      const index = prenotazioni.findIndex(elem => elem.id === prenotazione.id);
      if (index !== -1) {
        prenotazioni[index] = prenotazione;
      }
    });
  }

  getRichiestePrenotazioni(): Observable<any[]> {
    return this.richiestePrenotazioni = of(RICHIESTE_PRENOTAZIONI_MOCK)
  }

  updateRichiestaPrenotazione(nuovaPren: Prenotazione): void {
    this.getRichiestePrenotazioni().subscribe(richieste => {
      const index = richieste.findIndex(elem => elem.id === nuovaPren.id);
      if (index !== -1) {
        richieste[index] = nuovaPren;
      }
    });
  }
}
