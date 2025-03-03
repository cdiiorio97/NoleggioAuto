import { Component, inject, OnInit } from '@angular/core';
import { Auto, Prenotazione, Utente } from '../../config';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { MyActions, MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { DateFormatPipe } from '../../date-format.pipe';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { ACCEPT_BUTTON, REFUSE_BUTTON } from '../../costanti';

@Component({
  selector: 'app-richieste-prenotazioni',
  templateUrl: './richieste-prenotazioni.component.html',
  styleUrl: './richieste-prenotazioni.component.css'
})
export class RichiestePrenotazioniComponent implements OnInit {
  private prenotazioniService = inject(PrenotazioniService)
  private datePipe = inject(DateFormatPipe)
  private authService = inject(AutenticazioneService)

  nuoveRichieste: Prenotazione[] = [];
  headers: MyHeaders[] = [
      { name: "ID", field: "id", sorting: 'asc', visibile: true },
      { name: "Utente", field: "utente", sorting: 'asc', visibile: true },
      { name: "Auto", field: "auto", sorting: 'asc', visibile: true },
      { name: "Data Inizio", field: "dataInizio", sorting: 'asc', visibile: true },
      { name: "Data Fine", field: "dataFine", sorting: 'asc', visibile: true },
      { name: "Data Richiesta", field: "dataRichiesta", sorting: 'asc', visibile: true },
      { name: "Actions", field: "actions", sorting: 'asc', visibile: true }
    ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8 }
  };
  actionsTabella: MyActions[] = []
  datiCaricati: boolean = false;
  utenteOperazione?: Utente = this.authService.getUtenteLoggato();

  ngOnInit(){
    this.actionsTabella.push(ACCEPT_BUTTON)
    this.actionsTabella.push(REFUSE_BUTTON)
    this.getRichiestePrenotazione();
  }

  getRichiestePrenotazione(): void{
    this.prenotazioniService.getRichiestePrenotazioni().subscribe({
      next: (lista: Prenotazione[]) => {
        this.nuoveRichieste = lista;
        this.nuoveRichieste.forEach(elem => {
          for (const key in elem) {
            const value = (elem as any)[key];
            if(key === "utente") {
              if(elem[key]?.cognome != null && elem[key]?.cognome != null)
                (elem as any)[key] = `${elem[key]?.nome} ${elem[key]?.cognome}`
              else 
                (elem as any)[key] = "";
            }
            if(key === "auto")
              (elem as any)[key] = `${elem[key]?.brand} ${elem[key]?.modello}`
            if (value instanceof Date || (typeof value === 'string' && !isNaN(Date.parse(value))))
              (elem as any)[key] = this.datePipe.transform(value, "yyyy-MM-dd", "dd-MM-yyyy");
          }
          elem.editabile = true;
        });
      },
      error: (e) => { alert(e.error)},
      complete: () => { this.datiCaricati = true}
    })
  }

  handleAction(event: { action: string, row: Prenotazione }): void {
    let prenotazione: Prenotazione = {} as Prenotazione;
    prenotazione.id = event.row.id;
    switch(event.action){
      case 'rifiuta': 
        prenotazione.rifiutataDa = this.authService.getUtenteLoggato();
        this.onDecline(prenotazione);
        break;
      case "accetta":
        prenotazione.confermataDa = this.authService.getUtenteLoggato();
        this.onAccept(prenotazione);
        break;
    }
  }

  onDecline(row: Prenotazione): void {
    if (confirm(`Sei sicuro di voler respingere la prenotazione con ID ${row.id}?`)) {
      this.prenotazioniService.rifiutaPrenotazione(row).subscribe({
        next: (response) => {
          alert(response) 
          window.location.reload();
        },
        error: (error) => { alert(error.error) }
      });
    }
  }

  onAccept(row: Prenotazione): void {
    if (confirm(`Sei sicuro di voler accettare la prenotazione con ID ${row.id}?`)) {
      this.prenotazioniService.accettaPrenotazione(row).subscribe({
        next: (response) => {
          alert(response) 
          window.location.reload();
        },
        error: (error) => { alert(error.error) }
      });
    }
  }

}
