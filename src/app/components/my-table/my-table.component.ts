import { Component, inject, Input, OnInit } from '@angular/core';
import { MyActions, MyHeaders, MyTableConfig } from './my-table-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css'
})

export class MyTableComponent implements OnInit{
  @Input() data: any[] = [];
  @Input() tableConfig: MyTableConfig | undefined;
  @Input() dettagliURL?: string;
  @Input() aggiuntaURL?: string;
  @Input() actionsTabella?: MyActions[] = [];
  @Input() aggiuntaConsentita?: boolean = false;
  @Input() permessiEditRow: boolean = false;

  originalData: any[] = [];
  sortedColumn: string = '';
  order: string = '';
  filteredData: any[] = [];
  orderedData: any[] = [];
  filtro: { [key: string]: string } = {};
  valoreFiltro: string = '';
  campoFiltro: string = '';
  vecchioCampoFiltro: string = '';
  pagina: number = 1;
  modificaAction: MyActions | undefined;
  aggiungiAction: MyActions | undefined;
  eliminaAction: MyActions | undefined;
  accettaAction: MyActions | undefined;
  rifiutaAction: MyActions | undefined;
  isAdmin: boolean = false;
  private router = inject(Router);

  ngOnInit(): void {
    this.originalData = this.data;
    this.filteredData = this.data || [];
    this.orderedData = this.data || [];
    this.filtro = {};

    this.isAdmin = sessionStorage.getItem("isAdmin") === "true" ? true : false;
    
    this.aggiungiAction = JSON.parse(sessionStorage.getItem("addAction") ?? ''); 
    this.modificaAction = JSON.parse(sessionStorage.getItem("editAction") ?? ''); 
    this.eliminaAction = JSON.parse(sessionStorage.getItem("deleteAction") ?? '');
    this.accettaAction = JSON.parse(sessionStorage.getItem("accettaAction") ?? ''); 
    this.rifiutaAction = JSON.parse(sessionStorage.getItem("rifiutaAction") ?? '');
    if(this.router.url !== "/richieste-prenotazioni"){
      if (this.modificaAction) 
        this.actionsTabella?.push(this.modificaAction);
      if(this.eliminaAction)
        this.actionsTabella?.push(this.eliminaAction)
    } else {
      if (this.accettaAction)
        this.actionsTabella?.push(this.accettaAction);
      if(this.rifiutaAction)
        this.actionsTabella?.push(this.rifiutaAction);
    }
    
  }

  getStyle(header: MyHeaders){
    if (header.field.toLowerCase() === 'id' || header.field.toLowerCase() === 'isadmin' ) {
      return {
        'width': '5%'
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
        'width': '10%'
      };
    }
  }

  getClass(field: string, area: string): string {
    return `${field}-column-${area}`;
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

    return (arrayRisposta.length === 0 && Object.keys(this.filtro).length !== 0)
        ? [] 
        : this.filteredData = arrayRisposta;
  }

  cambiaPagina(pagina: number) {
    this.pagina = pagina;
  }

  get numeroPagine(): number[] {
    const totalPages = Math.ceil((this.filteredData?.length || 0) / (this.tableConfig?.pagination?.itemPerPage || 1));
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  modifica(row: any){
    this.router.navigateByUrl(`${this.dettagliURL}/${row.id}`);
  }

  async elimina(row: any){
    try{
      alert(`L'oggetto ${row.id} è stato eliminato`);
    } catch (error){
      alert(error)
    }
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  handleActionsClick(action: string, row: any){
    switch(action) {
      case 'edit':
        this.modifica(row);
        break;
      case 'delete':
        this.elimina(row);
        break;
      case 'accetta':
      case 'rifiuta':
        alert("prenotazione " + action + "ta")
        break;
      default:
        this.router.navigateByUrl(`/${action}/${row.id}`);
        break;
    }
  }
}
