import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RICHIESTE_PRENOTAZIONI_MOCK } from '../../mock-data';
import { Prenotazione } from '../../config';
import { BASE_URL } from '../../costanti';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrenotazioniService {
  private http = inject(HttpClient)
  baseUrl: string = `${BASE_URL}/prenotazioni`;

  getPrenotazioni(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/get-all`);
  }
  getPrenotazioniById(id: number): Observable<Prenotazione>{
    return this.http.get<Prenotazione>(`${this.baseUrl}/get-by-id?id=${id}`)
  }
  getPrenotazioniUtente(id: number): Observable<Prenotazione[]>{
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/get-by-user-id?id=${id}`)
  }

  addPrenotazione(newPren: any){
    /* this.getPrenotazioni().subscribe(pren => {
      pren.unshift(newPren);
      this.prenotazioni = of(pren);
    }); */
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
    return of(RICHIESTE_PRENOTAZIONI_MOCK)
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
