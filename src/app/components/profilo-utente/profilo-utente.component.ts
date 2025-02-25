import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Utente } from '../../config';
import { UtentiService } from '../../services/utenti/utenti.service';
import { AutenticazioneService } from '../../services/login/autenticazione.service';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrl: './profilo-utente.component.css'
})
export class ProfiloUtenteComponent {
  user: Utente = {
    id: 0,
    nome: '',
    cognome: '',
    isAdmin: false,
    email: '',
    password: ''
  }
  passwordVisibile: boolean = false;
  
  constructor(
    private location: Location,
    private userService: UtentiService,
  ) {}

  ngOnInit(): void {
    
    let utenteProvaString = sessionStorage.getItem("utenteLoggato")
    this.user = utenteProvaString !== null ? JSON.parse(utenteProvaString) : null;
  }

  togglePasswordVisibility() {
    this.passwordVisibile = !this.passwordVisibile;
    const password = document.getElementById('password') as HTMLInputElement;
    password.type = this.passwordVisibile ? 'text' : 'password';
  }

  async onSubmit() {
    try{
      await this.userService.updateUser(this.user);
      alert("utente aggiornato");
      this.location.back();
    }
    catch(e) {
      alert("errore durante l'aggiornamento dati: " + e)
    }
  }

  goBack(): void {
    this.location.back();
  }
}
