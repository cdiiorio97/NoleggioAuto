import { Component, inject } from '@angular/core';
import { Auto, Prenotazione, Utente } from '../../config';
import { Router } from '@angular/router';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { AutoService } from '../../services/auto/auto.service';
import { UtentiService } from '../../services/utenti/utenti.service';
import { MyActions } from '../my-table/my-table-config';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { DateFormatPipe } from '../../date-format.pipe';
import { BACK_BUTTON, SAVE_BUTTON } from '../../costanti';

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
    dataInizio: undefined,
    dataFine: undefined,
    dataRichiesta: new Date(),
    dataConferma: undefined,
    confermata: undefined,
    confermataDa: undefined,
    rifiutata: undefined,
    rifiutataDa: undefined,
    dataRifiuto: undefined
  }
  auto: string = '';
  autoList: Auto[] = []
  utenteName: string = '';
  utente: Utente | undefined;
  isAdmin: boolean = this.authService.getIsAdmin();
  goBackAction: MyActions = BACK_BUTTON;
  salvaAction: MyActions = SAVE_BUTTON;
  autoScelta: any | undefined;
  utenteLoggato: Utente = this.authService.getUtenteLoggato();
  currentUrl: string = this.router.url;
  dataMinima: string = this.datePipe.transform(new Date(), "yyyy-MM-dd", "yyyy-MM-dd");


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
      this.prenotazione.utente = this.utenteLoggato;
      this.prenotazione.dataInizio = !this.prenotazione.dataInizio ? undefined 
                                          : new Date(this.prenotazione.dataInizio).toISOString().split('T')[0];
      this.prenotazione.dataFine = !this.prenotazione.dataFine ? undefined 
                                          : new Date(this.prenotazione.dataFine).toISOString().split('T')[0];
      this.prenotazioniService.inserisciRichiestaPrenotazione(this.prenotazione).subscribe({
        next: () => {
          alert(`Richiesta prenotazione inoltrata correttamente`)
          this.goBack();
        },
        error: (e) => { alert(`errore durante l'aggiunta: ${e}`) }
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
 
  goBack(): void {
    this.authService.getIsAdmin() ? this.router.navigateByUrl("/prenotazioni") : this.router.navigateByUrl('/homepage')
  }
}
