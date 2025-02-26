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

  getUserById(id:number) : Utente {
    let foundUser = UTENTI_MOCK.find(elem => elem.id === id) as Utente;
    if (!foundUser) {
      throw new Error('User not found');
    }
    return foundUser;
  }

  addUser(newUser: any) {
    if (!this.utenti) {
      this.utenti = of([]);
    }
    else {
      this.getUtenti().subscribe(users => {
        users.unshift(newUser);
        this.utenti = of(users);
      });
    };
  }

  deleteUser(id: number) {
    this.getUtenti()
        .subscribe(utenti => {
            this.utenti = of(utenti.filter(user => user.id !== id));
        });
  }

  updateUser(updatedUser: any) {
    if (this.utenti) {
      this.getUtenti().subscribe(users => {
        const index = users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          users[index] = updatedUser;
        }
      });
    }
  }
}
