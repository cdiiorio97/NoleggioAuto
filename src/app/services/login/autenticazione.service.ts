import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utente } from '../../config';
import { UtentiService } from '../utenti/utenti.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {

  private authState = new BehaviorSubject<boolean>(this.checkAuthentication());
  private isAdmin = new BehaviorSubject<boolean>(this.checkIsAdmin());
  private errorMessage = new BehaviorSubject<Error>(new Error());

  constructor(private utentiService: UtentiService){}

  checkAuthentication(): boolean {
    return sessionStorage.getItem('authToken') !== null;
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  getErrorMessage(): Observable<Error> {
    return this.errorMessage.asObservable();
  }

  checkIsAdmin(): boolean {
    return sessionStorage.getItem('isAdmin') === 'true';
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }

  login(username: string, password: string): void {
    let user: Utente;
    this.utentiService.getUtenti()
            .subscribe(utenti => {
              try{
                user = utenti.find(user => user.nome === username);
                if (user && user.password === password) {
                  sessionStorage.setItem('authToken', 'dummy-token');
                  sessionStorage.setItem('isAdmin', user.isAdmin.toString());
                  this.authState.next(true);
                  this.isAdmin.next(user.isAdmin);
                }
                else {
                  throw new Error("Autenticazione Fallita")
                }
              } catch(e: any){
                if (!user)
                  alert("Utente non registrato")
                else 
                  alert('Nome utente o password non validi');
                this.errorMessage.next(e);
                this.authState.next(false)
              }
            });
  }


  logout(): void {
    sessionStorage.removeItem('authToken');
    this.authState.next(false);
  }
}
