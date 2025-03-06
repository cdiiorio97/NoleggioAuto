import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../costanti';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {
  private http = inject(HttpClient)
  public storageService = inject(StorageService)
  private baseUrl: string = `${BASE_URL}/auth`;
  private httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login?username=${username}&password=${password}`;
    return this.http.post(url, {}, { headers: this.httpOptions, withCredentials: true, responseType: 'text'}); 
  }
  
  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/logout`, this.httpOptions);
  }
}
