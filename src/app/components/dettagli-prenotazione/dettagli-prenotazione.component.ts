import { Component, inject } from '@angular/core';
import { Auto, Prenotazione, Utente } from '../../config';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { AutoService } from '../../services/auto/auto.service';
import { UtentiService } from '../../services/utenti/utenti.service';
import { MyActions } from '../my-table/my-table-config';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { DateFormatPipe } from '../../date-format.pipe';
import { BACK_BUTTON } from '../../costanti';

@Component({
  selector: 'app-dettagli-prenotazione',
  templateUrl: './dettagli-prenotazione.component.html',
  styleUrl: './dettagli-prenotazione.component.css'
})
export class DettagliPrenotazioneComponent {
  private autoService = inject(AutoService)
  private userService = inject(UtentiService)
  private router = inject(Router)
  private location = inject(Location)
  private prenotazioniService = inject(PrenotazioniService)
  private authService = inject(AutenticazioneService)
  private datePipe = inject(DateFormatPipe)

  prenotazione: Prenotazione = {
    id: 0,
    utente: {
      id: 0,
      nome: '',
      cognome: '',
      isAdmin: false,
      email: '',
      password: ''
    },
    auto: {
      id: 0,
      brand: '',
      modello: '',
      targa: ''
    },
    dataInizio: new Date(),
    dataFine: new Date(),
    dataRichiesta: new Date(),
    dataConferma: new Date(),
    dataCancellazione: new Date(),
    confermata: false,
    confermataDa: undefined,
    cancellata: false,
    cancellataDa: undefined
  }
  auto: string = '';
  autoList: Auto[] = []
  utenteName: string = '';
  utente: Utente | undefined;
  goBackAction: MyActions = BACK_BUTTON;
  autoScelta: any | undefined;
  utenteLoggato: Utente = this.authService.getUtenteLoggato();
  currentUrl: string = this.router.url;
  dataMinima: string = this.datePipe.transform(new Date(), "yearFirst");


  ngOnInit(): void {
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
      error: (e) => {
        alert(e.error.text)
        sessionStorage.setItem("getErrorMessage", e.error.text)
      }
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
    this.prenotazione.dataCancellazione = this.prenotazione?.dataCancellazione ? this.datePipe.transform(this.prenotazione?.dataCancellazione, "yearFirst") : undefined
    this.prenotazione.dataConferma = this.prenotazione?.dataConferma ? this.datePipe.transform(this.prenotazione?.dataConferma, "yearFirst") : undefined
    this.prenotazione.dataInizio = this.datePipe.transform(this.prenotazione.dataInizio, "yearFirst")
    this.prenotazione.dataRichiesta = this.datePipe.transform(this.prenotazione.dataRichiesta, "yearFirst")
    this.prenotazione.dataFine = this.datePipe.transform(this.prenotazione.dataFine, "yearFirst")
  }

  async onSubmit() {
    if(this.currentUrl === "/aggiungi-prenotazione"){
      this.prenotazione.dataRichiesta = this.datePipe.transform(new Date());
      //this.prenotazione.idUtente = this.utenteLoggato?.id ?? 0;
      this.prenotazione.dataConferma = undefined;
      this.prenotazione.dataCancellazione = undefined;
      this.prenotazione.confermataDa = undefined;
      this.prenotazione.cancellataDa = undefined;
      try{
        this.prenotazioniService.addPrenotazione(this.prenotazione)
        alert("Richiesta di prenotazione inoltrata")
        this.router.navigateByUrl("/homepage")
      } catch (e){
        alert(`errore durante l'aggiunta: ${e}`)
      }
    }
    else {
      try{
        await this.prenotazioniService.updatePrenotazione(this.prenotazione);
        alert("utente aggiornato");
        this.router.navigateByUrl(`/prenotazioni-utente?id=${this.utenteLoggato.id}`)
      }
      catch(e) {
        alert(`errore durante l'aggiornamento dati: ${e}`)
      }
    }
  }

  goBack(): void {
    this.authService.getIsAdmin() ? this.router.navigateByUrl("/prenotazioni") : this.router.navigateByUrl('/homepage')
  }
}
