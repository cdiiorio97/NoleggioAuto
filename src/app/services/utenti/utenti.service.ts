import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UTENTI_MOCK } from '../../mock-data';
import { Utente } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class UtentiService {
  utenti: Observable<Utente[]> | undefined;

  constructor() { }

  getUtenti():Observable<any[]>{
    return this.utenti = of(UTENTI_MOCK);
  }

  addUser(user: any) {
    if (!this.utenti) {
      this.utenti = of([]);
    }
    this.utenti.subscribe(users => users.push(user));
  }

  deleteUser(id: number) {
    this.getUtenti()
        .subscribe(utenti => {
            this.utenti = of(utenti.filter(user => user.id !== id));
        });
  }

  updateUser(updatedUser: any) {
    if (this.utenti) {
      this.utenti.subscribe(users => {
        const index = users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          users[index] = updatedUser;
        }
      });
    }
  }
}
