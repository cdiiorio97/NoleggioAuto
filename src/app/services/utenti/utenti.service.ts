import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Utente } from '../../config';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../utils/utils.service';
import { BASE_URL } from '../../costanti';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  private baseUrl: string = `${BASE_URL}/utenti`;

  constructor (
    private http: HttpClient, 
    private utilsService: UtilsService
  ) {}

  getUtenti():Observable<Utente[]>{
    return this.http.get<Utente[]>(`${this.baseUrl}/get-all`);
  }

  getUserById(id:number) : Observable<Utente> {
    console.log(`${this.baseUrl}/get-by-id/${id}`)
    return this.http.get<Utente>(`${this.baseUrl}/get-by-id?id=${id}`);
  }

  addUser(newUser: any) {
    this.getUtenti().subscribe(users => {
        users.unshift(newUser);
        return of(users);
    });
  }

/*   deleteUser(id: number) {
    this.getUtenti()
        .subscribe(utenti => {
            this.utenti = of(utenti.filter(user => user.id !== id));
        });
  } */

  updateUser(updatedUser: any) {
    this.getUtenti().subscribe(users => {
      const index = users.findIndex(user => user.id === updatedUser.id);
      if (index !== -1) {
        users[index] = updatedUser;
      }
    });
  }
}
