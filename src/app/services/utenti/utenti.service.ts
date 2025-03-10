import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../costanti';
import { DtoUtenteModificato } from '../../dto/DtoUtenteModificato';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private baseUrl: string = `${BASE_URL}/utenti`;
  private http = inject(HttpClient)
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getUtenti():Observable<Utente[]>{
    return this.http.get<Utente[]>(`${this.baseUrl}/admin/get-all`);
  }

  getUserById(id:number) : Observable<Utente> {
    return this.http.get<Utente>(`${this.baseUrl}/all/get-by-id?id=${id}`);
  }

  getUserByEmail(email:string) : Observable<Utente> {
    const url = `${this.baseUrl}/all/get-by-email?email=${email}`;
    return this.http.get<Utente>(url, {headers: this.headers, withCredentials: true, responseType: 'json' });
  }

  gestioneUtente(user: DtoUtenteModificato, action: string): Observable<any>{
    if (action==="ADD"){
      const url = `${this.baseUrl}/admin/aggiungi-utente`;
      return this.http.post<any>(url, user, { headers: this.headers, responseType: 'text' as 'json' })
    }
    else {
      const url = `${this.baseUrl}/all/modifica-utente`;
      return this.http.put<Utente>(url, user, { headers: this.headers, responseType: 'text' as 'json' })
    }
  }

  deleteUtente(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/admin/elimina-utente?id=${id}`, { responseType: "text"});;
  }
}
