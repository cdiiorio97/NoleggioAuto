import { Injectable } from '@angular/core';

const UTENTE_LOGGATO = 'utenteLoggato';
const IS_ADMIN = 'isAdmin';
const IS_LOGGED = 'isLogged';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  clean(): void {
    window.sessionStorage.clear();
  }

  public setUtenteLoggato(user: any): void {
    window.sessionStorage.removeItem(UTENTE_LOGGATO);
    window.sessionStorage.setItem(UTENTE_LOGGATO, JSON.stringify(user));
  }

  public getUtenteLoggato(): any {
    const user = window.sessionStorage.getItem(UTENTE_LOGGATO);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  setIsLogged(isLogged: boolean): void{
    window.sessionStorage.setItem(IS_LOGGED, JSON.stringify(isLogged))
  }

  public getIsLogged(): boolean {
    return window.sessionStorage.getItem(IS_LOGGED) === "true" ? true : false;
  }

  setIsAdmin(isAdmin: boolean): void{
    window.sessionStorage.setItem(IS_ADMIN, JSON.stringify(isAdmin))
  }

  public getIsAdmin(): boolean {
    return window.sessionStorage.getItem(IS_ADMIN) === "true" ? true : false;
  }
}