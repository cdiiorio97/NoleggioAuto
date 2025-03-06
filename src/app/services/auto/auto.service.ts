import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auto } from '../../config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BASE_URL } from '../../costanti';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  http = inject(HttpClient)
  private baseUrl: string = `${BASE_URL}/auto`
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getAutomobili() : Observable<Auto[]> {
    return this.http.get<Auto[]>(`${this.baseUrl}/all/get-all`);
  }

  getAutoById(id:number): Observable<Auto> {
    return this.http.get<Auto>(`${this.baseUrl}/all/get-by-id?id=${id}`)
  }

  addAuto(newAuto: Auto): Observable<any>{
    const url = `${this.baseUrl}/admin/aggiungi-auto`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Auto>(url, newAuto, { headers: this.headers, responseType: 'text' as 'json' })
  }

  updateAuto(auto: Auto): Observable<any>{
    const url = `${this.baseUrl}/admin/modifica-auto`;
    return this.http.put<Auto>(url, auto, { headers: this.headers, responseType: 'text' as 'json' })
  }

  deleteAuto(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/admin/elimina-auto?id=${id}`, { responseType: "text"});;
  }

  getAutoDisponibili(dataInizio: string, dataFine: string): Observable<any> {
    return this.http.get<Auto[]>(`${this.baseUrl}/all/trova-auto-disponibili?dataInizio=${dataInizio}&dataFine=${dataFine}`);
  }
}
