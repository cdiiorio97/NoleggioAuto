import { Component, inject } from '@angular/core';
import { Utente } from '../../config';
import { MyActions, MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { UtentiService } from '../../services/utenti/utenti.service';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  utentiService = inject(UtentiService)
  private authService = inject(AutenticazioneService)
  private router = inject(Router);
  utenti: Utente[]  = [];
  prenotazioni: any[] = [];
  actions: MyActions[] = [{
    label: "Prenotazioni",
      field: "prenotazioni",
      icon: "view_list",
      iconPosition: "left",
      css: {
        "display": "flex",
        "flex-direction": "row",
        "margin-top": "5px", 
        "height": "30px", 
        "width": "fit-content",
        "padding": "10px",
        "margin-right": "5px", 
        "border-radius": "10px",
        "background-color": "grey",
        "color": "white",
        "align-items":"center"
      }
  }];
  headers: MyHeaders[] = [
    { name: "Nome", field: "nome", sorting: 'asc', visibile: true },
    { name: "Cognome", field: "cognome", sorting: 'asc', visibile: true },
    { name: "Amministratore", field: "isAdmin", sorting: 'asc', visibile: true },
    { name: "Email", field: "email", sorting: 'asc', visibile: true },
    { name: "Password", field: "password", sorting: 'asc', visibile: false },
    { name: "Actions", field: "actions", sorting: 'asc', visibile: true }
  ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8 },
  }
  utenteLoggato: Utente = this.authService.getUtenteLoggato();

  ngOnInit(): void {
    if(this.utenteLoggato.isAdmin)
      this.getUtenti()
    else
      this.router.navigateByUrl(`prenotazioni-utente/${this.utenteLoggato.id}`)
  }

  getUtenti(): void {
    this.utentiService.getUtenti().subscribe({
      next: (data : Utente[]) => {
        this.utenti = data;
      },
      error: (e) => {
        alert(e.error.text)
        sessionStorage.setItem("getErrorMessage", e.error.text)
        },
    })
  }
}
