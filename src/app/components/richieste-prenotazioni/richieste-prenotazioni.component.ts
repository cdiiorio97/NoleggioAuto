import { Component, inject, OnInit } from '@angular/core';
import { Prenotazione } from '../../config';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-richieste-prenotazioni',
  templateUrl: './richieste-prenotazioni.component.html',
  styleUrl: './richieste-prenotazioni.component.css'
})
export class RichiestePrenotazioniComponent implements OnInit {
  private prenotazioniService = inject(PrenotazioniService)
  private datePipe = inject(DateFormatPipe)
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

  ngOnInit(){
    this.getRichiestePrenotazione();
  }

  getRichiestePrenotazione(): void{
    this.prenotazioniService.getRichiestePrenotazioni().subscribe({
      next: (lista: Prenotazione[]) => {
        this.nuoveRichieste = lista;
        this.nuoveRichieste.forEach(elem => {
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
      }
    })
  }

}
