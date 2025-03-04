import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../costanti';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticazioneService {
  private baseUrl: string = `${BASE_URL}/auth`;
  private httpOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
  private http = inject(HttpClient)
  public storageService = inject(StorageService)

  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const body = { username: username, password: password };

    return this.http.post(url, {username, password}, { headers: this.httpOptions }); 

  }
  
  logout(): void /*Observable<any>*/{
    this.storageService.clean()
    //return this.http.post(`${this.baseUrl}/logout`, { }, httpOptions);
  }

  signUp(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/signup`,
      {
        username,
        email,
        password,
      },
      {headers: this.httpOptions}
    );
  }
}
