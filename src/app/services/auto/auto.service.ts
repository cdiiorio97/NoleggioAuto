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
    return this.http.get<Auto[]>(`${this.baseUrl}/get-all`);
  }

  getAutoById(id:number): Observable<Auto> {
    return this.http.get<Auto>(`${this.baseUrl}/get-by-id?id=${id}`)
  }

  addAuto(newAuto: Auto): Observable<any>{
    const url = `${this.baseUrl}/aggiungi-auto`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, newAuto, { headers, responseType: 'text' as 'json' })
  }

  updateAuto(auto: Auto){
    if (auto) {
      this.getAutomobili().subscribe(automobili => {
        const index = automobili.findIndex(car => car.id === auto.id);
        if (index !== -1) {
          automobili[index] = auto;
        }
      });
    }
  }

  deleteAuto(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/elimina-auto?id=${id}`, { responseType: "text"});;
  }
}
