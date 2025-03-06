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
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getPrenotazioni(): Observable<Prenotazione[]> {
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/admin/get-all`);
  }
  getPrenotazioniById(id: number): Observable<Prenotazione>{
    return this.http.get<Prenotazione>(`${this.baseUrl}/all/get-by-id?id=${id}`)
  }
  getPrenotazioniUtente(email: string): Observable<Prenotazione[]>{
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/all/get-by-user-email?email=${email}`)
  }
  getPrenotazioniByUtenteId(id: number): Observable<Prenotazione[]>{
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/all/get-by-user-id?id=${id}`)
  }

  updatePrenotazione(prenotazione: Prenotazione): Observable<any> {
    const url = `${this.baseUrl}/user/modifica-prenotazione`;
    return this.http.put<Prenotazione>(url, prenotazione, { headers: this.headers, responseType: 'text' as 'json' })
  }

  deletePrenotazione(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/all/elimina-prenotazione?id=${id}`, { responseType: "text"});
  }

  getRichiestePrenotazioni(): Observable<any[]> {
    return this.http.get<Prenotazione[]>(`${this.baseUrl}/admin/get-richieste-prenotazioni`);
  }
  
  inserisciRichiestaPrenotazione(id: number, dataInizio: string, dataFine: string): Observable<any>{
    const url = `${this.baseUrl}/user/aggiungi-richiesta-prenotazione`;
    let body = {id: id, dataInizio: dataInizio, dataFine: dataFine}
    return this.http.post<Prenotazione>(url, body, { headers: this.headers, responseType: 'text' as 'json' })
  }

  accettaPrenotazione(id: number): Observable<any>{
    const url = `${this.baseUrl}/admin/conferma-prenotazione?id=${id}`;
    return this.http.put<number>(url, {}, { headers: this.headers, responseType: 'text' as 'json'});
  }

  rifiutaPrenotazione(id: number): Observable<any>{
    const url = `${this.baseUrl}/admin/rifiuta-prenotazione?id=${id}`;
    return this.http.put<number>(url, {}, { headers: this.headers, responseType: 'text' as 'json'});
  }
}
