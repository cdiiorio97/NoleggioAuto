import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { MyActions, MyHeaders, MyTableConfig } from './my-table-config';
import { ACCEPT_BUTTON, ADD_BUTTON, DELETE_BUTTON, EDIT_BUTTON, PAGINA_PRECEDENTE_BUTTON, PAGINA_SUCCESSIVA_BUTTON, REFUSE_BUTTON } from '../../costanti';
import { Prenotazione } from '../../config';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css'
})

export class MyTableComponent implements OnInit{
  public storageService = inject(StorageService)
  @Input() data: any[] = [];
  @Input() tableConfig: MyTableConfig | undefined;
  @Input() dettagliURL?: string;
  @Input() aggiuntaURL?: string;
  @Input() actionsTabella?: MyActions[] = [];
  @Input() aggiuntaConsentita?: boolean = false;
  @Input() permessiEditRow: boolean = false;
  @Input() eliminazione?: any;
  @Input() datiCaricati?: boolean;
  @Output() actionClick = new EventEmitter<{ action: string, row: any }>();

  originalData: any[] = this.data;
  sortedColumn: string = '';
  order: string = '';
  filteredData: any[] = [];
  orderedData: any[] = [];
  filtro: { [key: string]: string } = {};
  valoreFiltro: string = '';
  campoFiltro: string = '';
  vecchioCampoFiltro: string = '';
  pagina: number = 1;
  modificaAction: MyActions = EDIT_BUTTON;
  aggiungiAction: MyActions = ADD_BUTTON;
  eliminaAction: MyActions = DELETE_BUTTON;
  accettaAction: MyActions = ACCEPT_BUTTON;
  rifiutaAction: MyActions = REFUSE_BUTTON;
  pagPrecedenteAction: MyActions = PAGINA_PRECEDENTE_BUTTON;
  paginaPrecedenteDisabled: boolean = true;
  paginaSuccessivaDisabled: boolean = this.numeroPagine.length === 1 ? true : false;
  pagSuccessivaAction: MyActions = PAGINA_SUCCESSIVA_BUTTON;
  isAdmin: boolean = this.storageService.getIsAdmin();

  ngOnInit(): void {
    this.filteredData = this.data || [];
    this.orderedData = this.data || [];
    this.filtro = {};
  }

  getStyle(header: MyHeaders){
    if (header.field.toLowerCase() === 'id' || header.field.toLowerCase() === 'isadmin' ||
         header.field.toLowerCase() === 'confermata' || header.field.toLowerCase() === 'rifiutata' || header.field.toLowerCase() === 'isAdmin') {
      return {
        'width': '5%',
        "align-items": "center"
      };
    }
    else if(header.field.toLowerCase() ==="actions"){
      return {
        "border":"none",
        "background-color":"white",
        "display":"none",
        "max-width":"250px"
      }
    }
    else {
      return {
        'width': '10%',
        "align-items": "center"
      };
    }
  }
  
  aggiornaCampoFiltro(): void {
    if(this.vecchioCampoFiltro !== this.campoFiltro)
      delete this.filtro[this.vecchioCampoFiltro.toLowerCase()];
    this.vecchioCampoFiltro = this.campoFiltro;
    this.valoreFiltro= '';
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

  aggiornaFiltro(){
    if(this.valoreFiltro === '') {
      delete this.filtro[this.campoFiltro.toLowerCase()];
      this.filteredData = this.orderedData;
      return;
    }
    else {
      this.filtro[this.campoFiltro.toLowerCase()] = this.valoreFiltro;
      this.filter();
    }
  }

  filter() {
    let arrayRisposta: any[] = this.orderedData.filter(elem => { 
      return Object.keys(this.filtro).every(field => {
        if (this.filtro[field]) {
          const value = elem[field] ? elem[field].toString().toLowerCase() : '';
          this.cambiaPagina(1);
          return value.includes(this.filtro[field].toString().toLowerCase());
        }
        return true;
      });
    });

    arrayRisposta.map((elem) => { 
      if(this.isPrenotazione(elem))
        elem.viewOnly = elem.editabile ? false : true })

    return (arrayRisposta.length === 0 && Object.keys(this.filtro).length !== 0)
        ? [] 
        : this.filteredData = arrayRisposta;
  }

  cambiaPagina(pagina: number) {
    this.pagina = pagina;
    this.paginaPrecedenteDisabled = this.pagina === 1 ? true : false;
    this.paginaSuccessivaDisabled = (this.tableConfig?.pagination?.itemPerPage ?? 0) >0 && 
                                    (pagina * (this.tableConfig?.pagination?.itemPerPage ?? 0)) >= this.filteredData.length
                                    ? true : false;
  }

  get numeroPagine(): number[] {
    const totalPages = Math.ceil((this.filteredData?.length || 0) / (this.tableConfig?.pagination?.itemPerPage || 1));
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  handleActionsClick(action: string, row: any){
    this.actionClick.emit({action, row})
  }

  private isPrenotazione(elem: any): elem is Prenotazione {
    return 'editabile' in elem;
  }
}
