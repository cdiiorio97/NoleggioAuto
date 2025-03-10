import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyActions, MyHeaders, MyTableConfig } from './my-table-config';
import { ADD_BUTTON, NUM_PAGINA_BUTTON, PAGINA_PRECEDENTE_BUTTON, PAGINA_SUCCESSIVA_BUTTON } from '../../costanti';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css'
})

export class MyTableComponent implements OnInit{
  @Input() data: any[] = [];
  @Input() tableConfig: MyTableConfig | undefined;
  @Output() actionClick = new EventEmitter<{ action: string, row: any }>();

  originalData: any[] = this.data;
  sortedColumn: string = '';
  order: string = '';
  filteredData: any[] = [];
  orderedData: any[] = [];
  campiFiltri: MyHeaders[] = []
  filtro: { [key: string]: string } = {};
  filtroRange: { [key: string]: string } = {};
  pagina: number = 1;
  aggiungiAction: MyActions = ADD_BUTTON;
  pageNumberButton: MyActions = NUM_PAGINA_BUTTON;
  paginaPrecedenteDisabled: boolean = true;
  paginaSuccessivaDisabled: boolean = false; 
  pagPrecedenteAction: MyActions = PAGINA_PRECEDENTE_BUTTON;
  pagSuccessivaAction: MyActions = PAGINA_SUCCESSIVA_BUTTON;

  ngOnInit(): void {
    this.filteredData = this.data || [];
    this.orderedData = this.data || [];
    this.filtro = {}
    this.paginaSuccessivaDisabled = this.numeroPagine?.length === 1 ? true : false;
    this.campiFiltri = this.tableConfig?.headers?.filter(elem => elem.field !== "actions") || [];
  }

  getStyle(header: MyHeaders){
      return header.css;
  }

  ordinaColonna(column: MyHeaders) {
    if (this.sortedColumn === column.field)   
        this.order = this.order === 'asc' ? 'desc' : 'asc';
    else {
      this.sortedColumn = column.field;
      this.order = column.sorting || 'asc';
    }

    if (!this.data) 
      return;
    this.orderedData.sort((a, b) => {
      if (a[column.field] < b[column.field]) 
        return this.order === 'asc' ? -1 : 1;
      else if (a[column.field] > b[column.field]) 
        return this.order === 'asc' ? 1 : -1;
      else
        return 0;
    });
  } 

  aggiornaFiltro(event: any) {
    this.filtro = {}
    this.filtroRange = {};
    if(event.type !== "date")
      this.filtro = event.input !== "" ? { [event.field]: event.input } : {};
    else {
      this.filtroRange[`${event.field}Min`] = event.inputMin;
      this.filtroRange[`${event.field}Max`] = event.inputMax;
    }
    this.filter();
    this.cambiaPagina(1);
  }

  filter() {
    let arrayRisposta: any[] = this.orderedData.filter(elem => { 
      
      if(Object.keys(this.filtroRange).length > 0 ){
        const field = Object.keys(this.filtroRange)[0].replace(/Min|Max/, '');
        const [day, month, year] = elem[field].split("-").map(Number);
        const dataElem = elem[field] !== "" ? new Date(year, month - 1, day) : undefined;
        const dataMin = this.filtroRange[`${field}Min`] !== undefined ? new Date(this.filtroRange[`${field}Min`]) : undefined;
        const dataMax = this.filtroRange[`${field}Max`] ? new Date(this.filtroRange[`${field}Max`]) : undefined;

        if(dataElem){
          if(dataMin && dataMax){
            if (!(dataElem >= dataMin && dataElem <= dataMax)) 
              return false;
          } 
          else if( (dataMin && dataElem) && dataElem <= dataMin )
            return false
          else if( (dataMax && dataElem) && dataElem >= dataMax )
            return false;
        } 
        else 
          return false;
      }
      else if(Object.keys(this.filtro).length > 0) {
        const field = Object.keys(this.filtro)[0]
        const filterValue = this.filtro[field]
        if (typeof filterValue === "string") {
          const value = elem[field] ? elem[field].toString().toLowerCase() : '';
          return value.includes(filterValue.toLowerCase())
        } 
        else if( filterValue === true || filterValue === false)
          return elem[field] === filterValue;
      }
      return true;
    });

    this.filteredData = !(arrayRisposta.length === 0 && Object.keys(this.filtro).length !== 0) ? arrayRisposta : [];
    return this.filteredData;
  }

  cambiaPagina(pagina: number) {
    this.pagina = pagina;
    this.paginaPrecedenteDisabled = this.pagina === 1 ? true : false;
    this.paginaSuccessivaDisabled = this.pagina === this.numeroPagine?.length 
                                    || this.filteredData.length < (this.tableConfig?.pagination?.itemPerPage ?? 1) 
                                        ? true : false;
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  handleActionsClick(action: string, row: any){
    this.actionClick.emit({action, row})
  }

  get numeroPagine(): number[] {
    const totalPages = Math.ceil((this.filteredData?.length || 0) / (this.tableConfig?.pagination?.itemPerPage || 1));
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
}
