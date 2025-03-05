import { Injectable } from '@angular/core';

const IS_ADMIN = 'isAdmin';
const IS_LOGGED = 'isLogged';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  clean(): void {  window.sessionStorage.clear(); }

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

  setToken(token: string): void{
    window.sessionStorage.setItem('token', token)
  }

  public getToken(): string {
    return window.sessionStorage.getItem('token') || '';
  }

  setEmail(email: string): void{
    window.sessionStorage.setItem('email', email)
  }

  public getEmail(): string {
    return window.sessionStorage.getItem('email') || '';
  }
}