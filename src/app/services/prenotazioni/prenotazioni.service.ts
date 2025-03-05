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
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/admin/get-all`);
  }
  getPrenotazioniById(id: number): Observable<Prenotazione>{
    return this.http.get<Prenotazione>(`${this.baseUrl}/all/get-by-id?id=${id}`)
  }
  getPrenotazioniUtente(email: string): Observable<Prenotazione[]>{
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/all/get-by-user-email?email=${email}`)
  }

  updatePrenotazione(prenotazione: Prenotazione): Observable<any> {
    const url = `${this.baseUrl}/user/modifica-prenotazione`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Prenotazione>(url, prenotazione, { headers, responseType: 'text' as 'json' })
  }

  deletePrenotazione(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/all/elimina-prenotazione?id=${id}`, { responseType: "text"});
  }

  getRichiestePrenotazioni(): Observable<any[]> {
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/admin/get-richieste-prenotazioni`);
  }
  
  inserisciRichiestaPrenotazione(newPren: Prenotazione): Observable<any>{
    const url = `${this.baseUrl}/user/aggiungi-richiesta-prenotazione`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Prenotazione>(url, newPren, { headers, responseType: 'text' as 'json' })
  }

  accettaPrenotazione(prenotazione: Prenotazione): Observable<any>{
    const url = `${this.baseUrl}/admin/conferma-prenotazione`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Prenotazione>(url, prenotazione, { headers, responseType: 'text' as 'json' });
  }

  rifiutaPrenotazione(prenotazione: Prenotazione): Observable<any>{
    const url = `${this.baseUrl}/admin/rifiuta-prenotazione`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Prenotazione>(url, prenotazione, { headers, responseType: 'text' as 'json' });
  }
}
