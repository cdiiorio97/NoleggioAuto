import { Component } from '@angular/core';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { Prenotazione, Utente } from '../../config';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrl: './prenotazioni.component.css'
})
export class PrenotazioniComponent {
  prenotazioni: Prenotazione[] | undefined;
  utenteLoggato: Utente | undefined;
  backButtonVisibile: boolean = false;
  dettagliPrenotazione: string = "/dettagli-prenotazione/"
  historyUtente: any | undefined;
  headers: MyHeaders[] = [
    { name: "ID", field: "id", sorting: 'asc', visibile: true },
    { name: "ID Utente", field: "idUtente", sorting: 'asc', visibile: true },
    { name: "ID Auto", field: "idAuto", sorting: 'asc', visibile: true },
    { name: "Data Inizio", field: "dataInizio", sorting: 'asc', visibile: true },
    { name: "Data Fine", field: "dataFine", sorting: 'asc', visibile: true },
    { name: "Data Richiesta", field: "dataRichiesta", sorting: 'asc', visibile: true },
    { name: "Data Conferma", field: "dataConferma", sorting: 'asc', visibile: false },
    { name: "Data Cancellazione", field: "dataCancellazione", sorting: 'asc', visibile: false },
    { name: "Confermata", field: "confermata", sorting: 'asc', visibile: true },
    { name: "Confermata Da", field: "confermataDa", sorting: 'asc', visibile: false },
    { name: "Cancellata Da", field: "cancellataDa", sorting: 'asc', visibile: false }
  ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8 }
  };

  constructor(
    private prenotazioneService: PrenotazioniService
  ){}

  ngOnInit(): void {
    let utenteLoggato
    if(history.state.utente){
      utenteLoggato = history.state.utente;
      this.historyUtente = history.state.utente;
    }
    else {
      let utenteLoggatoString = sessionStorage.getItem("utenteLoggato");
      utenteLoggato = utenteLoggatoString ? JSON.parse(utenteLoggatoString) : null;
    }
    this.prenotazioneService.getPrenotazioni()
      .subscribe((data : Prenotazione[]) => {
        if(!utenteLoggato.isAdmin || history.state.utente)
          this.prenotazioni = data.filter(prenotazione => prenotazione.idUtente === utenteLoggato.id);
        if(!utenteLoggato.isAdmin)
          this.tableConfig.headers = this.tableConfig.headers?.filter(elem => elem.field !== "idUtente")
        if(utenteLoggato.isAdmin) {
          this.prenotazioni = data;
        }
      });
    }
}
