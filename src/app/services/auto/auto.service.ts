import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auto } from '../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../costanti';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private baseUrl: string = `${BASE_URL}/auto`
  http = inject(HttpClient)

  getAutomobili() : Observable<Auto[]> {
    return this.http.get<Auto[]>(`${this.baseUrl}/all/get-all`);
  }

  getAutoById(id:number): Observable<Auto> {
    return this.http.get<Auto>(`${this.baseUrl}/all/get-by-id?id=${id}`)
  }

  addAuto(newAuto: Auto): Observable<any>{
    const url = `${this.baseUrl}/admin/aggiungi-auto`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Auto>(url, newAuto, { headers, responseType: 'text' as 'json' })
  }

  updateAuto(auto: Auto): Observable<any>{
    const url = `${this.baseUrl}/admin/modifica-auto`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Auto>(url, auto, { headers, responseType: 'text' as 'json' })
  }

  deleteAuto(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/admin/elimina-auto?id=${id}`, { responseType: "text"});;
  }
}
