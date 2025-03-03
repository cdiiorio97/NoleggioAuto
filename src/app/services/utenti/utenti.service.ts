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
    return this.http.get<Utente[]>(`${this.baseUrl}/get-all`);
  }

  getUserById(id:number) : Observable<Utente> {
    return this.http.get<Utente>(`${this.baseUrl}/get-by-id?id=${id}`);
  }

  addUtente(newUser: Utente): Observable<any>{
    const url = `${this.baseUrl}/aggiungi-utente`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, newUser, { headers, responseType: 'text' as 'json' })
  }

  deleteUtente(id:number): Observable<any>{
    return this.http.delete(`${this.baseUrl}/elimina-utente?id=${id}`, { responseType: "text"});;
  }

  updateUser(updatedUser: any) {
    this.getUtenti().subscribe(users => {
      const index = users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        users[index] = updatedUser;
      }
    });
  }
}
