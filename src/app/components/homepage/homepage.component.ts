import { Component } from '@angular/core';
import { Utente } from '../../config';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { UtentiService } from '../../services/utenti/utenti.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  utenti: Utente[] | undefined;
  prenotazioni: any[] | undefined;
  headers: MyHeaders[] = [
    { name: "Nome", field: "nome", sorting: 'asc', visibile: true },
    { name: "Cognome", field: "cognome", sorting: 'asc', visibile: true },
    { name: "Amministratore", field: "isAdmin", sorting: 'asc', visibile: true },
    { name: "Email", field: "email", sorting: 'asc', visibile: true },
    { name: "Password", field: "password", sorting: 'asc', visibile: false }
  ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8 },
    actions: undefined,
  }
  isAdmin: boolean = false;
  dettagliUtente: string = "/dettagli-utente/"
  dettagliPrenotazione: string = "/dettagli-prenotazione/"

  constructor(
    private utentiService: UtentiService
  ){}

  ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem("isAdmin") === "true" ? true : false;

    this.utentiService.getUtenti()
      .subscribe((data : any) => {
        this.utenti = data;
      });
    }
}
