import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string, format: string, exitFormat?: string): string {
    let dateTemp, year, month, day;
    if(value instanceof Date){
      dateTemp = value;
      year = dateTemp.getFullYear();
      month = ('0' + (dateTemp.getMonth() + 1)).slice(-2);
      day = ('0' + dateTemp.getDate()).slice(-2);
    }
    else {
      if(format==="yyyy-MM-dd"){
        dateTemp = new Date(value)
        year = dateTemp.getFullYear();
        month = ('0' + (dateTemp.getMonth() + 1)).slice(-2);
        day = ('0' + dateTemp.getDate()).slice(-2);
      } else {
        const parts = value.split('-');
        if(parts.length!==3)
          throw new Error("formato data errato")
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; 
        const year = parseInt(parts[2], 10);
      
        dateTemp = new Date(year, month, day);
      }
    }
      
    if (exitFormat === 'yyyy-MM-dd') {
      return `${year}-${month}-${day}`;
    } else if (exitFormat === 'dd-MM-yyyy') {
      return `${day}-${month}-${year}`;
    } else {
      throw new Error('Formato non supportato');
    }
  }
}
