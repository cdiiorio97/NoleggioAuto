import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AUTO_MOCK } from '../../mock-data';
import { Auto } from '../../config';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../costanti';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private baseUrl: string = `${BASE_URL}/auto`
  http = inject(HttpClient)
  constructor() { }

  getAutomobili() : Observable<Auto[]> {
    return this.http.get<Auto[]>(`${this.baseUrl}/get-all`);
  }

  getAutoById(id:number): Auto {
    const auto = AUTO_MOCK.find(elem => elem.id === id);
    if (!auto) {
      throw new Error(`Auto with id ${id} not found`);
    }
    return auto;
  }

  addAuto(newAuto: Auto): void{
    this.getAutomobili().subscribe(auto => {
        auto.unshift(newAuto);
        //this.automobili = of(auto);
    });
  }

  updateAuto(auto: Auto){
    if (auto) {
      this.getAutomobili().subscribe(automobili => {
        const index = automobili.findIndex(car => car.id === auto.id);
        if (index !== -1) {
          automobili[index] = auto;
        }
      });
    }
  }

  deleteAuto(id:number){
    this.getAutomobili().subscribe(elem => of(elem.filter(auto => auto.id !== id)));
  }
}
