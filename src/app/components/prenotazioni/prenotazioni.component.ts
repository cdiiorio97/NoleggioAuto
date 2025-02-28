import { Component, Input, OnInit } from '@angular/core';
import { MyActions, MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { Prenotazione, Utente } from '../../config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrl: './prenotazioni.component.css'
})
export class PrenotazioniComponent implements OnInit {
  @Input() aggiuntaConsentita?: boolean;

  prenotazioni: Prenotazione[] = [];
  utenteLoggato: Utente | undefined;
  backButtonVisibile: boolean = false;
  dettagliPrenotazione: string = "/dettagli-prenotazione/"
  historyUtente: any | undefined;
  goBackAction: MyActions | undefined;
  headers: MyHeaders[] = [
    { name: "ID", field: "id", sorting: 'asc', visibile: true },
    { name: "ID Utente", field: "idUtente", sorting: 'asc', visibile: true },
    { name: "ID Auto", field: "idAuto", sorting: 'asc', visibile: true },
    { name: "Data Inizio", field: "dataInizio", sorting: 'asc', visibile: true },
    { name: "Data Fine", field: "dataFine", sorting: 'asc', visibile: true },
    { name: "Data Richiesta", field: "dataRichiesta", sorting: 'asc', visibile: true },
    { name: "Confermata", field: "confermata", sorting: 'asc', visibile: true },
    { name: "Data Conferma", field: "dataConferma", sorting: 'asc', visibile: true },
    { name: "Confermata Da", field: "confermataDa", sorting: 'asc', visibile: true },
    { name: "Data Cancellazione", field: "dataCancellazione", sorting: 'asc', visibile: true },
    { name: "Cancellata Da", field: "cancellataDa", sorting: 'asc', visibile: true }
  ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8 }
  };

  constructor(
    private prenotazioneService: PrenotazioniService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.goBackAction = JSON.parse(sessionStorage.getItem("goBackAction") ?? '')
    let utenteLoggatoString = sessionStorage.getItem("utenteLoggato");
    this.utenteLoggato = utenteLoggatoString ? JSON.parse(utenteLoggatoString) : null;
    let utenteTemp
    if(history.state.utente){
      utenteTemp = history.state.utente;
      this.historyUtente = history.state.utente;
    }
    else 
      utenteTemp = this.utenteLoggato;
    
    this.prenotazioneService.getPrenotazioni()
      .subscribe((data : Prenotazione[]) => {
        if(this.utenteLoggato){
          if(!this.utenteLoggato.isAdmin || this.historyUtente){
            this.prenotazioni = data.filter(prenotazione => prenotazione.idUtente === utenteTemp.id);
            this.tableConfig.headers = this.tableConfig.headers?.filter(elem => elem.field !== "idUtente")
          }
          else if (this.utenteLoggato.isAdmin)
            this.prenotazioni = data;
          
          if(this.prenotazioni){
            if(this.utenteLoggato.isAdmin){
              this.prenotazioni.forEach(elem => {
                elem.editabile = true;
              });
            }
            else {
              this.prenotazioni.forEach(elem => {
                elem.editabile = this.getDaysDifference(elem.dataInizio) > 2;
              });
            }
          }
        }
      });
  }

  goBack(): void {
    this.router.navigateByUrl('/homepage')
  }

  getDaysDifference(dataInizio: Date | string): number {
    let currentDate = new Date();
    const bookingDate = typeof(dataInizio) === "string" ? new Date(dataInizio) : dataInizio
    const diffTime = bookingDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
