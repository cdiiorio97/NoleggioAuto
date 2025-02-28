import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../costanti';
import { Utente } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {
  private baseUrl: string = `${BASE_URL}/auth`;
  private http = inject(HttpClient)

  setIsAdmin(isAdmin: string): void {
    sessionStorage.setItem("isAdmin", isAdmin);
  }
  setIsLogged(isLogged: string): void {
    sessionStorage.setItem("isLogged", isLogged);
  }
  setUtenteLoggato(utenteLoggato: Utente){
    sessionStorage.setItem('utenteLoggato', JSON.stringify(utenteLoggato))
  }

  getIsAdmin(): boolean {
    return sessionStorage.getItem("isAdmin") === "true" ? true : false;
  }
  getIsLogged(): boolean {
    return sessionStorage.getItem("isLogged") === "true" ? true : false;
  }
  getUtenteLoggato(): Utente {
    let utenteLoggatoString = sessionStorage.getItem("utenteLoggato");
    return utenteLoggatoString ? JSON.parse(utenteLoggatoString) : ''
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username: username, password: password };

    return this.http.post(url, body, { headers });
  }
  
  logout(): void {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('isLogged');
    sessionStorage.removeItem('utenteLoggato')
    this.setIsAdmin("false");
    this.setIsLogged("false");
  }
}
