import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginazione'
})
export class PaginazionePipe implements PipeTransform {
  transform(array: any[], pagina: number = 1, elementiPerPagina: number = 10): any[] {
    if (!array.length) return [];
    const start = (pagina - 1) * elementiPerPagina;
    const end = start + elementiPerPagina;
    return array.slice(start, end);
  }
}
