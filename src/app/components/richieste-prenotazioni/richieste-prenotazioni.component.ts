import { Component, inject, OnInit } from '@angular/core';
import { Prenotazione } from '../../config';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { ACCEPT_BUTTON, REFUSE_BUTTON, UTENTE_VUOTO } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';
import { DtoPrenotazioneTabella } from '../../dto/DtoPrenotazioneTabella';

@Component({
  selector: 'app-richieste-prenotazioni',
  templateUrl: './richieste-prenotazioni.component.html',
  styleUrl: './richieste-prenotazioni.component.css'
})
export class RichiestePrenotazioniComponent implements OnInit {
  private prenotazioniService = inject(PrenotazioniService)
  private datePipe = inject(DateFormatPipe)
  public storageService = inject(StorageService)

  nuoveRichieste: Prenotazione[] = [];
  nuoveRichiesteTabella: DtoPrenotazioneTabella[] = [];
  headers: MyHeaders[] = [
      { name: "ID", field: "id", sorting: 'asc', visibile: true, css:{'width': '5%', "align-items": "center"}, type: "string" },
      { name: "Utente", field: "utente", sorting: 'asc', visibile: true, type: "string" },
      { name: "Auto", field: "auto", sorting: 'asc', visibile: true, type: "string" },
      { name: "Data Inizio", field: "dataInizio", sorting: 'asc', visibile: true, type: "boolean" },
      { name: "Data Fine", field: "dataFine", sorting: 'asc', visibile: true, type: "boolean" },
      { name: "Data Richiesta", field: "dataRichiesta", sorting: 'asc', visibile: true, type: "date" },
      { name: "Actions", field: "actions", sorting: 'asc', visibile: true, css:{ "border":"none", "background-color":"white", "display":"none", "max-width":"250px" } }
    ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8, numeroPagine: [1] },
    myActions: [ACCEPT_BUTTON, REFUSE_BUTTON],
    aggiuntaUrl: ""
  };
  datiCaricati: boolean = false;

  ngOnInit(){
    this.getRichiestePrenotazione();
  }

  getRichiestePrenotazione(): void{
    this.prenotazioniService.getRichiestePrenotazioni().subscribe({
      next: (lista: Prenotazione[]) => {
        this.nuoveRichieste = lista;
        this.nuoveRichieste.forEach(elem => {
          let temp = new DtoPrenotazioneTabella(elem);
          temp.dataRichiesta = temp.dataRichiesta ? this.datePipe.transform(temp.dataRichiesta, "dd-MM-yyyy") : "";
          temp.dataInizio = temp.dataInizio ? this.datePipe.transform(temp.dataInizio, "dd-MM-yyyy") : "";
          temp.dataFine = temp.dataFine ? this.datePipe.transform(temp.dataFine, "dd-MM-yyyy") : "";
          temp.dataConferma = temp.dataConferma ? this.datePipe.transform(temp.dataConferma, "dd-MM-yyyy") : "";
          temp.dataRifiuto = temp.dataRifiuto ? this.datePipe.transform(temp.dataRifiuto, "dd-MM-yyyy") : "";
          temp.editabile = true;
          this.nuoveRichiesteTabella.push(temp)
        });
      },
      error: (e) => { alert(e.error)},
      complete: () => { this.datiCaricati = true}
    })
  }

  handleAction(event: { action: string, row: Prenotazione }): void {
    let prenotazione: Prenotazione = {} as Prenotazione;
    prenotazione.id = event.row.id;
    let utenteTemp = UTENTE_VUOTO;
    switch(event.action){
      case 'rifiuta': 
        prenotazione.rifiutataDa = utenteTemp;
        this.onDecline(prenotazione);
        break;
      case "accetta":
        prenotazione.confermataDa = utenteTemp;
        this.onAccept(prenotazione);
        break;
    }
  }

  onDecline(row: Prenotazione): void {
    if (confirm(`Sei sicuro di voler respingere la prenotazione con ID ${row.id}?`)) {
      this.prenotazioniService.rifiutaPrenotazione(row.id).subscribe({
        next: (response) => {
          alert(response) 
          window.location.reload();
        },
        error: (e) => { alert(e.error) }
      });
    }
  }

  onAccept(row: Prenotazione): void {
    if (confirm(`Sei sicuro di voler accettare la prenotazione con ID ${row.id}?`)) {
      this.prenotazioniService.accettaPrenotazione(row.id).subscribe({
        next: (response) => {
          alert(response) 
          window.location.reload();
        },
        error: (e) => { alert(e.error) }
      });
    }
  }
}
