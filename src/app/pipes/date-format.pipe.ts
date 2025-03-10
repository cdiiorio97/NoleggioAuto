import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  datePipe = new DatePipe('en-US');

  transform(value: Date | string, format: string = "yyyy-MM-dd"): string {
    return this.datePipe.transform(value, format) || '';
  }
}
