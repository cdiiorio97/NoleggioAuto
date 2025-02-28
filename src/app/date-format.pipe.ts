import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date | string, format: string = 'yyyyMMdd'): string {
    let dateTemp = typeof(value) === "string" ? new Date(value) : value;
    const year: number = dateTemp.getFullYear();
    const month = ('0' + (dateTemp.getMonth() + 1)).slice(-2);
    const day = ('0' + dateTemp.getDate()).slice(-2);

    if (format === 'yearFirst') {
      return `${year}-${month}-${day}`;
    } else if (format === 'dateFirst') {
      return `${day}-${month}-${year}`;
    } else {
      throw new Error('Formato non supportato');
    }
  }
}
