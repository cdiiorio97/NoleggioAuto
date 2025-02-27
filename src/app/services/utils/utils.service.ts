import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

/*   convertDateFormat(date: Date | string): string {
    let dateTemp = typeof(date) === "string" ? new Date(date) : date
    const year: number = dateTemp.getFullYear();
    const month = ('0' + (dateTemp.getMonth() + 1)).slice(-2);
    const day = ('0' + dateTemp.getDate()).slice(-2);
    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
  } */

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Si é verificato un errore:', error.message); 
    return throwError(()=> new Error(error.message));
  }
}
