import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prenotazione } from '../../config';
import { BASE_URL } from '../../costanti';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  updatePrenotazione(prenotazione: Prenotazione): void {
    this.getPrenotazioni().subscribe(prenotazioni => {
      const index = prenotazioni.findIndex(elem => elem.id === prenotazione.id);
      if (index !== -1) {
        prenotazioni[index] = prenotazione;
      }
    });
  }

  deletePrenotazione(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/elimina-prenotazione?id=${id}`, { responseType: "text"});;
  }

  getRichiestePrenotazioni(): Observable<any[]> {
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/get-richieste-prenotazioni`);
  }
  
  inserisciRichiestaPrenotazione(newPren: Prenotazione): Observable<any>{
    const url = `${this.baseUrl}/aggiungi-richiesta-prenotazione`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, newPren, { headers, responseType: 'text' as 'json' })
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
