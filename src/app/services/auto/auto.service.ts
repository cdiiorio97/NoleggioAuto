import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AUTO_MOCK } from '../../mock-data';
import { Auto } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  automobili: Observable<Auto[]>  | undefined;

  constructor() { }

  getAutomobili() : Observable<any[]> {
    return this.automobili = of(AUTO_MOCK);
  }

  getAutoById(id:number): Auto {
    const auto = AUTO_MOCK.find(elem => elem.id === id);
    if (!auto) {
      throw new Error(`Auto with id ${id} not found`);
    }
    return auto;
  }

  addAuto(newAuto: Auto){
    if (!this.automobili) {
      this.automobili = of([]);
    }
    else {
      this.getAutomobili().subscribe(auto => {
        auto.unshift(newAuto);
        this.automobili = of(auto);
      });
    };
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
