import { Component } from '@angular/core';
import { Prenotazione } from '../../config';
import { Router } from '@angular/router';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { AutoService } from '../../services/auto/auto.service';
import { UtentiService } from '../../services/utenti/utenti.service';
import { MyActions } from '../my-table/my-table-config';

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
  utente: string = '';
  goBackAction: MyActions | undefined;
  
  constructor(
    private autoService: AutoService,
    private userService: UtentiService,
    private router: Router,
    private prenotazioniService: PrenotazioniService
  ) {}


  ngOnInit(): void {
    const prenotazioneState = history.state.elem;
    if (prenotazioneState) {
      this.prenotazione = prenotazioneState;
      this.prenotazione.dataCancellazione = this.convertDateFormat(this.prenotazione.dataCancellazione)
      this.prenotazione.dataConferma = this.convertDateFormat(this.prenotazione.dataConferma)
      this.prenotazione.dataInizio = this.convertDateFormat(this.prenotazione.dataInizio)
      this.prenotazione.dataRichiesta = this.convertDateFormat(this.prenotazione.dataRichiesta)
      this.prenotazione.dataFine = this.convertDateFormat(this.prenotazione.dataFine)
      let autoTemp =  this.autoService.getAutoById(this.prenotazione.idAuto)
      this.auto = autoTemp.brand + " " + autoTemp.modello
      let userTemp = this.userService.getUserById(this.prenotazione.idUtente)
      this.utente = userTemp.nome + " " + userTemp.cognome;
      
      this.goBackAction = JSON.parse(sessionStorage.getItem("goBackAction") ?? '')
    }
  }

  togglePasswordVisibility() {
    this.passwordVisibile = !this.passwordVisibile;
    const password = document.getElementById('password') as HTMLInputElement;
    password.type = this.passwordVisibile ? 'text' : 'password';
  }

  convertDateFormat(date: Date | string): string {
    let dateTemp = new Date(date)
    const year: number = dateTemp.getFullYear();
    const month = ('0' + (dateTemp.getMonth() + 1)).slice(-2);
    const day = ('0' + dateTemp.getDate()).slice(-2);
    console.log(`${year}-${month}- ${day}`)
    return `${year}-${month}-${day}`;
  }

  async onSubmit() {
    try{
      await this.prenotazioniService.updatePrenotazione(this.prenotazione);
      alert("utente aggiornato");
      this.router.navigateByUrl('/prenotazioni')
    }
    catch(e) {
      alert("errore durante l'aggiornamento dati: ${e}")
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/prenotazioni')
  }
}
