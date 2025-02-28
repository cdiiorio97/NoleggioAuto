import { Component } from '@angular/core';
import { Auto, Prenotazione, Utente } from '../../config';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { AutoService } from '../../services/auto/auto.service';
import { UtentiService } from '../../services/utenti/utenti.service';
import { MyActions } from '../my-table/my-table-config';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { DateFormatPipe } from '../../date-format.pipe';

@Component({
  selector: 'app-dettagli-prenotazione',
  templateUrl: './dettagli-prenotazione.component.html',
  styleUrl: './dettagli-prenotazione.component.css'
})
export class DettagliPrenotazioneComponent {
  prenotazione: Prenotazione = {
    id: 0,
    idUtente: 0,
    idAuto: 0,
    dataInizio: new Date(),
    dataFine: new Date(),
    dataRichiesta: new Date(),
    dataConferma: new Date(),
    dataCancellazione: new Date(),
    confermata: false,
    confermataDa: 0,
    cancellataDa: 0
  }
  currentUrl: string = '';
  auto: string = '';
  autoList: Auto[] = []
  utenteName: string = '';
  utente: Utente | undefined;
  utenteLoggato: Utente | undefined;
  goBackAction: MyActions | undefined;
  autoScelta: any | undefined;
  dataMinima: string = '';
  
  constructor(
    private autoService: AutoService,
    private userService: UtentiService,
    private router: Router,
    private location: Location,
    private prenotazioniService: PrenotazioniService,
    private authService: AutenticazioneService,
    private datePipe: DateFormatPipe
  ) {}


  ngOnInit(): void {
    this.goBackAction = JSON.parse(sessionStorage.getItem("goBackAction") ?? '')
    this.currentUrl = this.router.url;
    let utenteLoggatoString = sessionStorage.getItem("utenteLoggato")
    this.utenteLoggato = utenteLoggatoString ? JSON.parse(utenteLoggatoString) : '';
    this.autoService.getAutomobili()
                    .subscribe(elems => this.autoList = elems)
    if (this.currentUrl !== "/aggiungi-prenotazione") {
      this.prenotazione = history.state.elem;
      this.convertiDatePrenotazione();
      let autoTemp =  this.autoService.getAutoById(this.prenotazione.idAuto)
      this.auto = autoTemp.brand + " " + autoTemp.modello
      this.userService.getUserById(this.prenotazione.idUtente).subscribe({
        next: (utente) => {
          this.utente = utente;
          this.utenteName = `${this.utente.nome} ${this.utente.cognome}`;
        },
        error: (e) => {

        }
      });
    }
    this.dataMinima = this.datePipe.transform(new Date())
  }

  getUserById(id: number): void {
    
  }

  convertiDatePrenotazione(){
    this.prenotazione.dataCancellazione = this.prenotazione?.dataCancellazione ? this.datePipe.transform(this.prenotazione?.dataCancellazione) : undefined
    this.prenotazione.dataConferma = this.prenotazione?.dataConferma ? this.datePipe.transform(this.prenotazione?.dataConferma) : undefined
    this.prenotazione.dataInizio = this.datePipe.transform(this.prenotazione.dataInizio)
    this.prenotazione.dataRichiesta = this.datePipe.transform(this.prenotazione.dataRichiesta)
    this.prenotazione.dataFine = this.datePipe.transform(this.prenotazione.dataFine)
  }


  async onSubmit() {
    if(this.currentUrl === "/aggiungi-prenotazione"){
      this.prenotazione.dataRichiesta = this.datePipe.transform(new Date());
      this.prenotazione.idUtente = this.utenteLoggato?.id ?? 0;
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
        this.goBack()
      }
      catch(e) {
        alert(`errore durante l'aggiornamento dati: ${e}`)
      }
    }
  }

  goBack(): void {
    this.authService.getIsAdmin() ? this.location.back() : this.router.navigateByUrl('/homepage')
  }

  changeAutoScelta(event: Event){
    let target = event.target as HTMLSelectElement;
    this.prenotazione.idAuto = target.value as unknown as number;
  }
}
