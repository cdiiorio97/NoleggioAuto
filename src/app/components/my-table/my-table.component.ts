import { Component, Input, OnInit } from '@angular/core';
import { MyActions, MyHeaders, MyTableConfig } from './my-table-config';
import { Router } from '@angular/router';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { UtentiService } from '../../services/utenti/utenti.service';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrl: './my-table.component.css'
})

export class MyTableComponent implements OnInit{
  @Input() data: any[] | undefined;
  @Input() tableConfig: MyTableConfig | undefined;

  originalData: any[] | undefined;
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
  actions: MyActions[] =[
    { label: "EDIT", 
      css: {
        "margin-top": "5px", 
        "height": "30px", 
        "margin-right": "5px", 
        "border-radius": "10px",
        "border-color": "lightblue", 
        "background-color": "lightblue"
      } 
    },
    { label: "DELETE", 
      css: {
        "margin-top": "5px",
        "height": "30px", 
        "background-color": "red", 
        "border-radius": "10px"
      } 
    },
    { label: "Aggiungi",
      css: {
        "margin-top": "0", 
        "height": "30px", 
        "width": "120px",
        "border-radius": "10px",
        "border": "none", 
        "background-color": "#2f8131",
        "color": "white",
        "font-weight": "bold"
      } 
    }
  ]
  isAdmin: boolean = false;

  constructor(
    private authService: AutenticazioneService,
    private router: Router,
    private userService: UtentiService
  ){}

  ngOnInit(): void {
    this.originalData = this.data;
    this.filteredData = this.data || [];
    this.orderedData = this.data || [];
    this.filtro = {};

    this.authService.getIsAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });
    
    
    this.aggiungiAction = this.actions?.find(action => action.label === 'Aggiungi');
    this.modificaAction = this.actions?.find(action => action.label === 'EDIT');
    this.eliminaAction = this.actions?.find(action => action.label === 'DELETE');
    
  }

  getStyle(header: MyHeaders){
    if (header.field.toLowerCase() === 'id' || header.field.toLowerCase() === 'isadmin' ) {
      return {
        'width': '5%'
      };
    } else {
      return {
        'width': '20%'
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

  aggiornaFiltro(event: Event){
    const target = event.target as HTMLInputElement;
    if(target.value === '') {
      delete this.filtro[this.campoFiltro.toLowerCase()];
      this.filteredData = this.orderedData;
      return;
    }
    else {
      this.filtro[this.campoFiltro.toLowerCase()] = target.value;
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

  handleActionsClick(event: Event, row: any){
    const action = event as unknown as String;
    if (action === "ADD NEW") 
      console.log(action);
    else
      console.log(action + " " + JSON.stringify(row));
  }

  modifica(row: any){
    this.router.navigateByUrl('/dettagli-utente/'+row.id, { state: { utente: row } });
  }

  async elimina(utente: any){
    try{
      await this.userService.deleteUser(utente.id);
      alert(`L'utente ${utente.nome} ${utente.cognome} è stato eliminato`);
      window.location.reload()
    } catch (error){
      alert(error)
    }
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }
}
