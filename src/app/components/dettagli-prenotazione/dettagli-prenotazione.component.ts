import { Component, inject } from '@angular/core';
import { Auto, Prenotazione, Utente } from '../../config';
import { ActivatedRoute, Router } from '@angular/router';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { AutoService } from '../../services/auto/auto.service';
import { UtentiService } from '../../services/utenti/utenti.service';
import { MyActions } from '../my-table/my-table-config';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
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
  private activeRoute = inject(ActivatedRoute)
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
  dataMinima: string = "";
  actionAllowed: string = "";

  ngOnInit(): void {
    this.dataMinima = this.datePipe.transform(new Date());
    this.userService.getUserByEmail(this.storageService.getEmail()).subscribe({
      next:(response)=> { this.utenteLoggato = response }
    })
    this.getAutoList();
    this.activeRoute.params.subscribe(param =>{
      this.actionAllowed = param['action'];
      const id = parseInt(param['id'],10);
      if(id !== null)
        this.getPrenotazioneById(id);
    })
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
    this.prenotazione.dataRichiesta = this.datePipe.transform(this.prenotazione.dataRichiesta)
    this.prenotazione.dataRifiuto = this.prenotazione?.dataRifiuto ? this.datePipe.transform(this.prenotazione?.dataRifiuto) : undefined 
    this.prenotazione.dataConferma = this.prenotazione?.dataConferma ? this.datePipe.transform(this.prenotazione?.dataConferma) : undefined 
    this.prenotazione.dataInizio = this.prenotazione?.dataInizio ? this.datePipe.transform(this.prenotazione?.dataInizio) : undefined
    this.prenotazione.dataFine = this.prenotazione?.dataFine ? this.datePipe.transform(this.prenotazione?.dataFine) : undefined                 
  }

  async onSubmit() {
    if(this.actionAllowed === "ADD"){
      let dataInizio = this.prenotazione.dataInizio ? new Date(this.prenotazione?.dataInizio) : undefined 
      let dataFine = this.prenotazione.dataFine ? new Date(this.prenotazione.dataFine) : undefined 
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
      let dataInizio = new Date(this.prenotazione.dataInizio)
      let dataFine = new Date(this.prenotazione.dataFine)
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
