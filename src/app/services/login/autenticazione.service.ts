import { Injectable } from '@angular/core';
import { Utente } from '../../config';
import { UtentiService } from '../utenti/utenti.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {
  constructor(private utentiService: UtentiService){}
  isLogged: boolean = false;
  isAdmin: boolean = false

  setIsAdmin(): void {
    this.isAdmin = sessionStorage.getItem("isAdmin") === "true" ? true : false;
  }

  setIsLogged(): void {
    this.isLogged = sessionStorage.getItem("isLogged") === "true" ? true : false
  }


  login(username: string, password: string): void {
    let user: Utente;
    this.utentiService.getUtenti()
            .subscribe(utenti => {
              try{
                user = utenti.find(user => user.nome.toLowerCase() === username.toLowerCase());
                if (user && user.password === password) {
                  sessionStorage.setItem('isAdmin', user.isAdmin.toString());
                  sessionStorage.setItem('isLogged', "true");
                  sessionStorage.setItem('utenteLoggato', JSON.stringify(user))
                }
                else {
                  throw new Error("Autenticazione Fallita")
                }
              } catch(e: any){
                if (!user)
                  alert("Utente non registrato")
                else 
                  alert('Nome utente o password non validi');
                sessionStorage.setItem("loginErrorMessage", e)
                sessionStorage.setItem('isLogged', "false");
              }
            });
  }
  
  logout(): void {
    sessionStorage.removeItem('isAdmin');
    sessionStorage.removeItem('isLogged');
    sessionStorage.removeItem('utenteLoggato')
    this.isLogged = false;
    this.isAdmin = false;
  }
}
