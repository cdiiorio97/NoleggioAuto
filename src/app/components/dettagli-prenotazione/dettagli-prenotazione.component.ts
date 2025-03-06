import { Component, inject } from '@angular/core';
import { Auto, Prenotazione, Utente } from '../../config';
import { Router } from '@angular/router';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { AutoService } from '../../services/auto/auto.service';
import { UtentiService } from '../../services/utenti/utenti.service';
import { MyActions } from '../my-table/my-table-config';
import { DateFormatPipe } from '../../date-format.pipe';
import { BACK_BUTTON, PRENOTAZIONE_VUOTA, SAVE_BUTTON, UTENTE_VUOTO } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-dettagli-prenotazione',
  templateUrl: './dettagli-prenotazione.component.html',
  styleUrl: './dettagli-prenotazione.component.css'
})
export class DettagliPrenotazioneComponent {
  private autoService = inject(AutoService)
  private userService = inject(UtentiService)
  private router = inject(Router)
  private prenotazioniService = inject(PrenotazioniService)
  private datePipe = inject(DateFormatPipe)
  public storageService = inject(StorageService)

  prenotazione: Prenotazione = PRENOTAZIONE_VUOTA;
  auto: string = '';
  autoList: Auto[] = [];
  autoCaricate: boolean = false;
  utenteName: string = '';
  utente: Utente | undefined;
  isAdmin: boolean = this.storageService.getIsAdmin();
  goBackAction: MyActions = BACK_BUTTON;
  salvaAction: MyActions = SAVE_BUTTON;
  autoScelta: any | undefined;
  utenteLoggato: Utente = UTENTE_VUOTO;
  currentUrl: string = this.router.url;
  dataMinima: string = this.datePipe.transform(new Date(), "yyyy-MM-dd", "yyyy-MM-dd");

  ngOnInit(): void {
    this.userService.getUserByEmail(this.storageService.getEmail()).subscribe({
      next:(response)=> { this.utenteLoggato = response }
    })
    this.getAutoList();
    if (this.currentUrl !== "/aggiungi-prenotazione"){
      const match = this.currentUrl.match(/\/dettagli-prenotazione\/(\d+)/);
      if (match) {
        const numero = parseInt(match[1], 10);
        this.getPrenotazioneById(numero);
      }
    }
  }

  getAutoList(): void{
    this.autoService.getAutomobili().subscribe({
      next: (automobili) => {  this.autoList = automobili }
    })
  }

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (utente) => {
        this.utente = utente;
        this.utenteName = `${this.utente.nome} ${this.utente.cognome}`;
      },
      error: (e) => { alert(e.error.text) }
    }); 
  }

  getPrenotazioneById(id:number): void {
    this.prenotazioniService.getPrenotazioniById(id).subscribe({
      next: (response: Prenotazione) => {
        this.prenotazione = response;
        this.convertiDatePrenotazione();
        this.autoScelta = this.prenotazione.auto;
        this.utente = this.prenotazione.utente;
      }
    })
  }

  convertiDatePrenotazione(){
    this.prenotazione.dataRichiesta = this.datePipe.transform(this.prenotazione.dataRichiesta, "yyyy-MM-dd", "yyyy-MM-dd")
    this.prenotazione.dataRifiuto = !this.prenotazione?.dataRifiuto ? undefined
                                        : this.datePipe.transform(this.prenotazione?.dataRifiuto, "yyyy-MM-dd", "yyyy-MM-dd") 
    this.prenotazione.dataConferma = !this.prenotazione?.dataConferma ? undefined
                                        : this.datePipe.transform(this.prenotazione?.dataConferma, "yyyy-MM-dd", "yyyy-MM-dd") 
    this.prenotazione.dataInizio = !this.prenotazione?.dataInizio ? undefined
                                        : this.datePipe.transform(this.prenotazione?.dataInizio, "yyyy-MM-dd", "yyyy-MM-dd")
    this.prenotazione.dataFine = !this.prenotazione?.dataFine ? undefined
                                        : this.datePipe.transform(this.prenotazione?.dataFine, "yyyy-MM-dd", "yyyy-MM-dd")                 
  }

  async onSubmit() {
    if(this.currentUrl === "/aggiungi-prenotazione"){
      let dataInizio = !this.prenotazione.dataInizio ? undefined 
                                          : this.datePipe.transform(this.prenotazione?.dataInizio, "yyyy-MM-dd", "yyyy-MM-dd");
      let dataFine = !this.prenotazione.dataFine ? undefined 
                                          : this.datePipe.transform(this.prenotazione?.dataFine, "yyyy-MM-dd", "yyyy-MM-dd");
      if(dataInizio && dataFine)
        this.prenotazioniService.inserisciRichiestaPrenotazione(this.prenotazione.auto.id, dataInizio, dataFine).subscribe({
          next: () => {
            alert(`Richiesta prenotazione inoltrata correttamente`)
            this.goBack();
          },
          error: (e) => { alert(`errore durante l'aggiunta: ${e.message}`) }
        })
    }
      else {
        this.prenotazioniService.updatePrenotazione(this.prenotazione).subscribe({
          next: () =>{
            alert("prenotazione aggiornata");
            window.location.reload();
          },
          error: (e) => { alert(e.error) }
        });
      }
  }

  onDateChange(): void{
    if(this.prenotazione.dataInizio && this.prenotazione.dataFine){
      let dataInizio = this.prenotazione.dataInizio instanceof Date ? this.datePipe.transform(this.prenotazione?.dataInizio, "yyyy-MM-dd", "yyyy-MM-dd") : this.prenotazione.dataInizio
      let dataFine = this.prenotazione.dataFine instanceof Date ? this.datePipe.transform(this.prenotazione?.dataFine, "yyyy-MM-dd", "yyyy-MM-dd") : this.prenotazione.dataFine
      this.autoService.getAutoDisponibili(dataInizio,dataFine).subscribe({
        next: (response) => {
          this.autoList = response;
          this.autoCaricate = true;
        }
      })
    }
  }
 
  goBack(): void {
    if(this.currentUrl === "/aggiungi-prenotazione"){
      this.prenotazione.dataInizio = "";
      this.prenotazione.dataFine = "";
    }
    this.storageService.getIsAdmin() ? this.router.navigateByUrl("/prenotazioni") : this.router.navigateByUrl('/homepage')
  }
}
