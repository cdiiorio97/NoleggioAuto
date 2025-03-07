import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utente } from '../../config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../costanti';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private baseUrl: string = `${BASE_URL}/utenti`;
  private http = inject(HttpClient)

  getUtenti():Observable<Utente[]>{
    return this.http.get<Utente[]>(`${this.baseUrl}/admin/get-all`);
  }

  getUserById(id:number) : Observable<Utente> {
    return this.http.get<Utente>(`${this.baseUrl}/all/get-by-id?id=${id}`);
  }

  getUserByEmail(email:string) : Observable<Utente> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<Utente>(`${this.baseUrl}/all/get-by-email?email=${email}`, {headers, withCredentials: true, responseType: 'json' });
  }

  addUtente(newUser: Utente): Observable<any>{
    const url = `${this.baseUrl}/admin/aggiungi-utente`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, newUser, { headers, responseType: 'text' as 'json' })
  }

  deleteUtente(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/admin/elimina-utente?id=${id}`, { responseType: "text"});;
  }

  updateUser(updatedUser: Utente): Observable<any> {
    const url = `${this.baseUrl}/all/modifica-utente`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Utente>(url, updatedUser, { headers, responseType: 'text' as 'json' })
  }
}
