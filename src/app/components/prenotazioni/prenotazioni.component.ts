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
  datiCaricati: boolean = false;

  ngOnInit(): void {
    this.caricaPrenotazioni()
  }

  caricaPrenotazioni(){
    if (this.currentUrl === "/prenotazioni"){
      if(this.utenteLoggato.isAdmin){
        this.tableConfig.headers?.splice(1,0,
          { name: "Utente", field: "utente", sorting: 'asc', visibile: true },
        )
        this.getPrenotazioniAdmin();
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

  getPrenotazioniAdmin(): void {
    this.prenotazioneService.getPrenotazioni().subscribe({
      next: (data : Prenotazione[]) => {
        this.prenotazioni = data;
        this.formattaInformazioni();
      },
      error: (e) => {
        alert(e.error.text)
        sessionStorage.setItem("getErrorMessage", e.error.text)
      },
      complete: ()=>{ this.datiCaricati = true }
    })
  }
  
  getPrenotazioniByUserId(id: number): void {
    this.prenotazioneService.getPrenotazioniUtente(id).subscribe({
      next: (response: Prenotazione[]) => {
        this.prenotazioni = response;
        this.formattaInformazioni();
      },
      error: (e) => {
        alert(e.error.text)
        sessionStorage.setItem("getErrorMessage", e.error.text)
      },
      complete: ()=>{ this.datiCaricati = true }
    })
    this.tableConfig.headers = this.tableConfig.headers?.filter(elem => elem.field !== "utente")
  }

  formattaInformazioni(): void {
    console.log(this.prenotazioni)
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
          (elem as any)[key] = this.datePipe.transform(value, "yyyy-MM-dd", "dd-MM-yyyy");
        }
      }
      let dataInizio = elem["dataInizio"] ? this.parseDateString(elem["dataInizio"].toString()) : null;
      if(dataInizio)
        elem.editabile = elem["dataInizio"] instanceof Date 
                        ? this.getDaysDifference(elem["dataInizio"]) 
                        : typeof elem["dataInizio"] === 'string' 
                            ? this.getDaysDifference(new Date(dataInizio)) 
                            : false;
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/homepage')
  }

  parseDateString(dateString: string): Date | null {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
      return null;
    }
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
  
    return new Date(year, month, day);
  }

  getDaysDifference(dataInizio: Date): boolean {
    let currentDate = new Date();
    const diffTime = dataInizio.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 2;
  }

  handleAction(event: { action: string, row: Prenotazione }): void {
    if (event.action === 'delete') 
      this.onDelete(event.row);
  }

  onDelete(row: Prenotazione): void {
    if (confirm(`Sei sicuro di voler eliminare la prenotazione con ID ${row.id}?`)) {
      this.prenotazioneService.deletePrenotazione(row.id).subscribe({
        next: (response) => {
          alert(response) 
          window.location.reload();
        },
        error: (error) => {
          alert(error.error)
        }
      });
    }
  }
}
