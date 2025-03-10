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

  gestioneAuto(auto: Auto, action: string): Observable<any>{
    if(action === "ADD"){
      const url = `${this.baseUrl}/admin/aggiungi-auto`;
      return this.http.post<Auto>(url, auto, { headers: this.headers, responseType: 'text' as 'json' })
    }
    else{
      const url = `${this.baseUrl}/admin/modifica-auto`;
      return this.http.put<Auto>(url, auto, { headers: this.headers, responseType: 'text' as 'json' })
    }
  }

  deleteAuto(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/admin/elimina-auto?id=${id}`, { responseType: "text"});;
  }

  getAutoDisponibili(dataInizio: Date, dataFine: Date): Observable<any> {
    const url = `${this.baseUrl}/all/trova-auto-disponibili?dataInizio=${dataInizio.toISOString()}&dataFine=${dataFine.toISOString()}`;
    return this.http.get<Auto[]>(url);
  }
}
