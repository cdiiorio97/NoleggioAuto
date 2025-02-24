import { Component, Input } from '@angular/core';
import { Utente } from '../../config';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { UtentiService } from '../../services/utenti/utenti.service';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { TabellaService } from '../../services/tabella/tabella.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  headers: MyHeaders[] = [];
  utenti: Utente[] | undefined;
  prenotazioni: any[] | undefined;
  tableConfig: MyTableConfig | undefined;
  isAdmin: boolean = false;

  constructor(
    private utentiService: UtentiService, 
    private authService: AutenticazioneService,
    private prenotazioniService: PrenotazioniService,
    private tabellaService: TabellaService
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
        this.tabellaService.getHeaders("utenti")
            .subscribe((headers: MyHeaders[]) => {
              this.headers = headers 
            });
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
        this.tabellaService.getHeaders("prenotazioni")
            .subscribe((headers: MyHeaders[]) => {
              this.headers = headers 
            });
      }
    }

    this.tableConfig = {
      headers: this.headers.filter(elem => elem.visibile),
      pagination: { itemPerPage: 8 },
      actions: undefined,
    }
  }
}
