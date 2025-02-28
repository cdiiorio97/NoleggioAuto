import { Component, OnInit } from '@angular/core';
import { Prenotazione } from '../../config';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';

@Component({
  selector: 'app-richieste-prenotazioni',
  templateUrl: './richieste-prenotazioni.component.html',
  styleUrl: './richieste-prenotazioni.component.css'
})
export class RichiestePrenotazioniComponent implements OnInit {
  nuoveRichieste: Prenotazione[] = [];
  headers: MyHeaders[] = [
      { name: "ID", field: "id", sorting: 'asc', visibile: true },
      { name: "ID Utente", field: "idUtente", sorting: 'asc', visibile: true },
      { name: "ID Auto", field: "idAuto", sorting: 'asc', visibile: true },
      { name: "Data Inizio", field: "dataInizio", sorting: 'asc', visibile: true },
      { name: "Data Fine", field: "dataFine", sorting: 'asc', visibile: true },
      { name: "Data Richiesta", field: "dataRichiesta", sorting: 'asc', visibile: true },
      { name: "Actions", field: "actions", sorting: 'asc', visibile: true }
    ];
    tableConfig: MyTableConfig = {
      headers: this.headers.filter(elem => elem.visibile),
      pagination: { itemPerPage: 8 }
    };

  constructor(private prenotazioniService: PrenotazioniService){}

  ngOnInit(){
    this.prenotazioniService.getRichiestePrenotazioni()
      .subscribe(lista => this.nuoveRichieste = lista)
  }

}
