import { Component } from '@angular/core';
import { Auto, Prenotazione, Utente } from '../../config';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { AutoService } from '../../services/auto/auto.service';
import { UtentiService } from '../../services/utenti/utenti.service';
import { MyActions } from '../my-table/my-table-config';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { UtilsService } from '../../services/utils/utils.service';

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
  passwordVisibile: boolean = false;
  currentUrl: string = '';
  auto: string = '';
  autoList: Auto[] = []
  utenteName: string = '';
  utente: Utente | undefined;
  utenteLoggato: Utente | undefined;
  goBackAction: MyActions | undefined;
  autoScelta: any | undefined;
  
  constructor(
    private autoService: AutoService,
    private userService: UtentiService,
    private router: Router,
    private location: Location,
    private prenotazioniService: PrenotazioniService,
    private authService: AutenticazioneService,
    private utilsService: UtilsService
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
      this.utente = this.userService.getUserById(this.prenotazione.idUtente)
      this.utenteName = `${this.utente.nome} ${this.utente.cognome}`
    }
  }

  convertiDatePrenotazione(){
    this.prenotazione.dataCancellazione = this.prenotazione?.dataCancellazione ? this.utilsService.convertDateFormat(this.prenotazione?.dataCancellazione) : undefined
    this.prenotazione.dataConferma = this.prenotazione?.dataConferma ? this.utilsService.convertDateFormat(this.prenotazione?.dataConferma) : undefined
    this.prenotazione.dataInizio = this.utilsService.convertDateFormat(this.prenotazione.dataInizio)
    this.prenotazione.dataRichiesta = this.utilsService.convertDateFormat(this.prenotazione.dataRichiesta)
    this.prenotazione.dataFine = this.utilsService.convertDateFormat(this.prenotazione.dataFine)
  }

  togglePasswordVisibility() {
    this.passwordVisibile = !this.passwordVisibile;
    const password = document.getElementById('password') as HTMLInputElement;
    password.type = this.passwordVisibile ? 'text' : 'password';
  }

  async onSubmit() {
    if(this.currentUrl === "/aggiungi-prenotazione"){
      this.prenotazione.dataRichiesta = this.utilsService.convertDateFormat(new Date());
      this.prenotazione.idUtente = this.utenteLoggato?.id ?? 0;
      this.prenotazione.dataConferma = undefined;
      this.prenotazione.dataCancellazione = undefined;
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
    this.authService.isAdmin ? this.location.back() : this.router.navigateByUrl('/homepage')
  }

  changeAutoScelta(event: Event){
    let target = event.target as HTMLSelectElement;
    this.prenotazione.idAuto = target.value as unknown as number;
  }
}
