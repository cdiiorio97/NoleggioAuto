import { Component, inject, Input, OnInit } from '@angular/core';
import { MyActions, MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { Prenotazione, Utente } from '../../config';
import { Router } from '@angular/router';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { DatePipe } from '@angular/common';
import { DateFormatPipe } from '../../date-format.pipe';

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
    { name: "Utente", field: "idUtente", sorting: 'asc', visibile: true },
    { name: "Auto", field: "idAuto", sorting: 'asc', visibile: true },
    { name: "Data Inizio", field: "dataInizio", sorting: 'asc', visibile: true },
    { name: "Data Fine", field: "dataFine", sorting: 'asc', visibile: true },
    { name: "Data Richiesta", field: "dataRichiesta", sorting: 'asc', visibile: true },
    { name: "Confermata", field: "confermata", sorting: 'asc', visibile: true },
    { name: "Data Conferma", field: "dataConferma", sorting: 'asc', visibile: true },
    { name: "Confermata Da", field: "confermataDa", sorting: 'asc', visibile: true },
    { name: "Data Cancellazione", field: "dataCancellazione", sorting: 'asc', visibile: true },
    { name: "Cancellata Da", field: "cancellataDa", sorting: 'asc', visibile: true },
    { name: "Actions", field: "actions", sorting: 'asc', visibile: true },
  ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8 }
  };
  private prenotazioneService = inject(PrenotazioniService);
  private authService = inject(AutenticazioneService)
  private router = inject(Router);
  private datePipe = inject(DateFormatPipe);
  currentUrl: string = this.router.url;

  constructor(
  ) {}

  ngOnInit(): void {
    this.goBackAction = JSON.parse(sessionStorage.getItem("goBackAction") ?? '');
    this.utenteLoggato = this.authService.getUtenteLoggato(); 
    if (this.currentUrl === "/prenotazioni"){
      if(this.utenteLoggato.isAdmin)
        this.getPrenotazioni();
      else 
        this.getPrenotazioniByUserId()
    }
    else if (this.currentUrl === "/dettagli-prenotazione"){
    const match = this.currentUrl.match(/\/dettagli-prenotazione\/(\d+)/);
      if (match) {
        const numero = parseInt(match[1], 10);
        this.getPrenotazioneById(numero);
      }
    }
    else if( this.currentUrl === "/aggiungi-prenotazione"){

    }
/*     if(history.state.utente){
      utenteTemp = history.state.utente;
      this.historyUtente = history.state.utente;
    }
    else 
      utenteTemp = this.utenteLoggato;
    
    this.prenotazioneService.getPrenotazioni()
      .subscribe((data : Prenotazione[]) => {
        if(this.utenteLoggato){
          if(!this.utenteLoggato.isAdmin || this.historyUtente){
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
      }); */
  }

  getPrenotazioni(): void {
    this.prenotazioneService.getPrenotazioni().subscribe({
      next: (data : Prenotazione[]) => {
        this.prenotazioni = data;
        console.log("1")
        console.log(data)
        this.prenotazioni.forEach(elem => {
          for (const key in elem) {
            const value = (elem as any)[key];
            if(key === "utente" || key === "confermataDa" || key === "cancellataDa") {
              if(elem[key]?.cognome != null && elem[key]?.cognome != null)
                (elem as any)[key] = `${elem[key]?.nome} ${elem[key]?.cognome}`
              else 
                (elem as any)[key] = "";
            }
            if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
              (elem as any)[key] = this.datePipe.transform(value, "dateFirst");
            }
          }
          elem.editabile = true;
        });
        console.log("2")
        console.log(this.prenotazioni)
      },
      error: (e) => {
        alert(e.error.text)
        sessionStorage.setItem("getErrorMessage", e.error.text)
        },
    })
  }
  getPrenotazioneById(id:number): void {
  }
  getPrenotazioniByUserId(): void {
    if(this.utenteLoggato && !this.utenteLoggato.isAdmin){
      this.prenotazioneService.getPrenotazioniUtente(this.utenteLoggato?.id).subscribe({
        next: (response: Prenotazione[]) => {
          this.prenotazioni = response;
          this.prenotazioni.forEach(elem => {
            elem.editabile = this.getDaysDifference(elem.dataInizio) > 2;
          });
        }
      })
      this.tableConfig.headers = this.tableConfig.headers?.filter(elem => elem.field !== "idUtente")
    }
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
