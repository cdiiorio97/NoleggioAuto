import { Component, Input } from '@angular/core';
import { Utente } from '../config';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { UtentiService } from '../utenti.service';
import { AutenticazioneService } from '../autenticazione.service';
import { PrenotazioniComponent } from '../prenotazioni/prenotazioni.component';
import { PrenotazioniService } from '../prenotazioni.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  @Input() utenti: Utente[] | undefined;
  @Input() prenotazioni: any[] | undefined;
  headers: MyHeaders[] = [];
  tableConfig: MyTableConfig | undefined;
  utenteDummy: Utente ={
    id: 0,
    nome: '',
    cognome: '',
    admin: false,
    email: '',
    password: ''
  }
  prenotazioneDummy: any ={
    id: 0,
    idUtente: 0,
    idAuto: 0,
    dataRichiesta: undefined,
    dataInizio: undefined,
    dataFine: undefined,
    dataConferma: undefined,
    dataCancellazione: undefined,
    confermataDa: undefined,
    cancellataDa: undefined
  }
  isAdmin: boolean = false;

  constructor(
    private utentiService: UtentiService, 
    private authService: AutenticazioneService,
    private prenotazioniService: PrenotazioniService
  ){}

  ngOnInit(): void {
    this.authService.getIsAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
    });

    if(this.isAdmin){
      if(!this.utenti){
        this.utentiService.getUtenti()
          .subscribe((data : any) => {
            this.utenti = data;
        });
      }
      if (this.utenti && this.utenti.length > 0) {
        this.headers = Object.keys(this.utenteDummy)
            .filter(key => key !== "password")
            .map(key => ({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    field: key,
                    sorting: 'asc'
                    }));
      }
    }
    else {
      if(!this.prenotazioni){
        this.prenotazioniService.getPrenotazioni()
          .subscribe((data : any) => {
            this.prenotazioni = data;
        });
      }
      if (this.prenotazioni && this.prenotazioni.length > 0) {
        this.headers = Object.keys(this.prenotazioneDummy)
            .map(key => ({
                    name: key.charAt(0).toUpperCase() + key.slice(1),
                    field: key,
                    sorting: 'asc'
                    }));
      }
    }

      this.tableConfig = {
        headers: this.headers,
        pagination: { itemPerPage: 8 },
        actions: undefined,
      }
    }
}
