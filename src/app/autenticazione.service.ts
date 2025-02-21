import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {

  private authState = new BehaviorSubject<boolean>(this.checkAuthentication());
  private isAdmin = new BehaviorSubject<boolean>(this.checkIsAdmin());

  checkAuthentication(): boolean {
    return sessionStorage.getItem('authToken') !== null;
  }

  getAuthState(): Observable<boolean> {
    return this.authState.asObservable();
  }

  checkIsAdmin(): boolean {
    return sessionStorage.getItem('isAdmin') === 'true';
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }

  login(isAdmin: boolean): void {
    sessionStorage.setItem('authToken', 'dummy-token');
    sessionStorage.setItem('isAdmin', isAdmin.toString());
    this.authState.next(true);
    this.isAdmin.next(isAdmin);
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.authState.next(false);
  }
}
