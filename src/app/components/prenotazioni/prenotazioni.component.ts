import { Component, inject, Input, OnInit } from '@angular/core';
import { MyActions, MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { Prenotazione, Utente } from '../../config';
import { Router } from '@angular/router';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { DateFormatPipe } from '../../date-format.pipe';
import { BACK_BUTTON } from '../../costanti';
import { UtentiService } from '../../services/utenti/utenti.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrl: './prenotazioni.component.css'
})
export class PrenotazioniComponent implements OnInit {
  @Input() aggiuntaConsentita?: boolean;
  private prenotazioneService = inject(PrenotazioniService);
  private authService = inject(AutenticazioneService);
  private userService = inject(UtentiService);
  private router = inject(Router);
  private datePipe = inject(DateFormatPipe);

  prenotazioni: Prenotazione[] = [];
  utenteLoggato: Utente = this.authService.getUtenteLoggato();
  utenteSelezionato: Utente | undefined;
  backButtonVisibile: boolean = false;
  goBackAction: MyActions = BACK_BUTTON;
  headers: MyHeaders[] = [
    { name: "ID", field: "id", sorting: 'asc', visibile: true },
    { name: "Auto", field: "auto", sorting: 'asc', visibile: true },
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
  currentUrl: string = this.router.url;

  ngOnInit(): void {
    if (this.currentUrl === "/prenotazioni"){
      if(this.utenteLoggato.isAdmin){
        this.tableConfig.headers?.splice(1,0,
          { name: "Utente", field: "utente", sorting: 'asc', visibile: true },
        )
        this.getPrenotazioni();
      }
    }
    else {
      if(this.utenteLoggato.isAdmin){
        this.backButtonVisibile = true;
        const match = this.currentUrl.match(/\/prenotazioni-utente\/(\d+)/);
        if (match) {
          const numero = parseInt(match[1], 10);
          this.userService.getUserById(numero).subscribe({
            next: (user: Utente) => { 
              this.utenteSelezionato = user 
              this.getPrenotazioniByUserId(this.utenteSelezionato?.id);
            },
            error: (e) => {console.log(e.error.text)}
          });
        }
      } 
      else
        this.getPrenotazioniByUserId(this.utenteLoggato.id);
    }
  }

  getPrenotazioni(): void {
    this.prenotazioneService.getPrenotazioni().subscribe({
      next: (data : Prenotazione[]) => {
        this.prenotazioni = data;
        this.prenotazioni.forEach(elem => {
          for (const key in elem) {
            const value = (elem as any)[key];
            if(key === "utente" || key === "confermataDa" || key === "cancellataDa") {
              if(elem[key]?.cognome != null && elem[key]?.cognome != null)
                (elem as any)[key] = `${elem[key]?.nome} ${elem[key]?.cognome}`
              else 
                (elem as any)[key] = "";
            }
            if(key ==="auto")
                (elem as any)[key] = `${elem[key]?.brand} ${elem[key]?.modello}`
            if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
              (elem as any)[key] = this.datePipe.transform(value, "dateFirst");
            }
          }
          elem.editabile = true;
        });
      },
      error: (e) => {
        alert(e.error.text)
        sessionStorage.setItem("getErrorMessage", e.error.text)
        },
    })
  }
  
  getPrenotazioniByUserId(id: number): void {
    this.prenotazioneService.getPrenotazioniUtente(id).subscribe({
      next: (response: Prenotazione[]) => {
        this.prenotazioni = response;
        this.prenotazioni.forEach(elem => {
          for (const key in elem) {
            const value = (elem as any)[key];
            if(key === "utente" || key === "confermataDa" || key === "cancellataDa") {
              if(elem[key]?.cognome != null && elem[key]?.cognome != null)
                (elem as any)[key] = `${elem[key]?.nome} ${elem[key]?.cognome}`
              else 
                (elem as any)[key] = "";
            }
            if(key ==="auto")
                (elem as any)[key] = `${elem[key]?.brand} ${elem[key]?.modello}`
            if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value)))) {
              (elem as any)[key] = this.datePipe.transform(value, "dateFirst");
            }
          }
          elem.editabile = this.getDaysDifference(elem.dataInizio) > 2;
        });
      }
    })
    this.tableConfig.headers = this.tableConfig.headers?.filter(elem => elem.field !== "idUtente")
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
