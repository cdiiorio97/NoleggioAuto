import { Component, inject } from '@angular/core';
import { Utente } from '../../config';
import { MyActions, MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { UtentiService } from '../../services/utenti/utenti.service';
import { Router } from '@angular/router';
import { DELETE_BUTTON, EDIT_BUTTON, PRENOTAZIONI_BUTTON, UTENTE_VUOTO } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  utentiService = inject(UtentiService)
  public storageService = inject(StorageService)
  private router = inject(Router);
  utenti: Utente[]  = [];
  utenteLoggato: Utente = UTENTE_VUOTO;
  prenotazioni: any[] = [];
  actions: MyActions[] = []
  headers: MyHeaders[] = [
    { name: "Nome", field: "nome", sorting: 'asc', visibile: true, type: "string" },
    { name: "Cognome", field: "cognome", sorting: 'asc', visibile: true, type: "string" },
    { name: "Amministratore", field: "isAdmin", sorting: 'asc', visibile: true,  css:{'width': '5%', "align-items": "center"}, type: "boolean"  },
    { name: "Email", field: "email", sorting: 'asc', visibile: true, type: "string" },
    { name: "Actions", field: "actions", sorting: 'asc', visibile: true, css:{ "border":"none", "background-color":"white", "display":"none", "max-width":"250px" } }
  ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8, numeroPagine: [1] },
    myActions: [],
    aggiuntaUrl: ""
  }
  datiCaricati: boolean = false;

  ngOnInit(): void {
    this.utentiService.getUserByEmail(this.storageService.getEmail()).subscribe({
      next: (response) => {
        this.utenteLoggato = response;

        if(response.isAdmin){
          if (this.tableConfig.myActions)
            this.tableConfig.myActions.push(PRENOTAZIONI_BUTTON, EDIT_BUTTON, DELETE_BUTTON);
          this.tableConfig.aggiuntaUrl = '/dettagli-utente/ADD';
          this.getUtenti()
        }
        else
          this.router.navigate(['/prenotazioni-utente',response.id])
      }
    })
    
  }

  getUtenti(): void {
    this.utentiService.getUtenti().subscribe({
      next: (data : Utente[]) => { 
        this.utenti = data.map(elem => {
          elem.editabile = true;
          return elem;
        });
      },
      error: (e) => { alert(e.error) },
      complete: () => { this.datiCaricati = true; }
    })
  }

  handleAction(event: {action: string, row: Utente}){
    switch(event.action){
      case 'delete':
        this.onDelete(event.row)
        break;
      case 'edit':
        this.router.navigateByUrl(`/dettagli-utente/EDIT/${event.row.id}`)
        break;
      case 'viewDetails':
        this.router.navigateByUrl(`/dettagli-utente/VIEW/${event.row.id}`)
        break;
      case "prenotazioni":
        this.router.navigateByUrl(`/prenotazioni-utente/${event.row.id}`);
        break;
    }
  }

  onDelete(row: Utente): void {
    if (confirm(`Sei sicuro di voler eliminare l'utente con ID ${row.id}?`)) {
      this.utentiService.deleteUtente(row.id).subscribe({
        next: (response) => {
          alert(response) 
          window.location.reload();
        },
        error: (e) => { alert(e.error) }
      });
    }
  }
}
