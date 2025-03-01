import { Component, inject, Input } from '@angular/core';
import { Utente } from '../../config';
import { UtentiService } from '../../services/utenti/utenti.service';
import { Router } from '@angular/router';
import { MyActions } from '../my-table/my-table-config';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { BACK_BUTTON, SAVE_BUTTON, VISIBILITY_BUTTON, VISIBILITY_OFF_BUTTON } from '../../costanti';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrl: './profilo-utente.component.css'
})
export class ProfiloUtenteComponent {
  private userService = inject(UtentiService)
  private router = inject(Router)
  private authService = inject(AutenticazioneService)
  user: Utente = {
    id: 0,
    nome: '',
    cognome: '',
    isAdmin: false,
    email: '',
    password: ''
  }
  passwordVisibile: boolean = false;
  currentUrl: string = this.router.url;
  goBackAction: MyActions = BACK_BUTTON;
  salvaAction: MyActions = SAVE_BUTTON;
  visibilityAction: MyActions = VISIBILITY_BUTTON;

  ngOnInit(): void {
    if(this.currentUrl === "/profilo-utente")
      this.user = this.authService.getUtenteLoggato() 
    else if(this.currentUrl !== "/aggiungi-utente"){
      const match = this.currentUrl.match(/\/dettagli-utente\/(\d+)/);
        if (match) {
          const numero = parseInt(match[1], 10);
          this.getUserById(numero);
        }
      }
    }

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (elem: Utente) => {
        this.user = elem;
      },
      error: (e) => {
        alert(e.error.text)
        sessionStorage.setItem("getErrorMessage", e.error.text)
      }
    })
  }

  togglePasswordVisibility() {
    this.passwordVisibile = !this.passwordVisibile;
    this.visibilityAction = this.visibilityAction === VISIBILITY_BUTTON ? VISIBILITY_OFF_BUTTON : VISIBILITY_BUTTON;
  }

  onSubmit() {
    if(this.currentUrl === "/aggiungi-utente"){
      try{
        this.userService.addUser(this.user)
        alert("utente aggiunto")
        this.router.navigateByUrl("/homepage")
      } catch (e){
        alert("errore durante l'aggiunta: " + e)
      }
    }
    else {
      try{
        this.userService.updateUser(this.user);
        alert("utente aggiornato");
        //this.router.navigateByUrl("/homepage")
      }
      catch(e) {
        alert("errore durante l'aggiornamento dati: " + e)
      }
    }
  }

  goBack(): void {
    this.router.navigateByUrl("/homepage")
  }
}
