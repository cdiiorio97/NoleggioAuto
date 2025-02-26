import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Utente } from '../../config';
import { UtentiService } from '../../services/utenti/utenti.service';
import { Router } from '@angular/router';

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
  currentUrl: string = '';
  
  constructor(
    private location: Location,
    private userService: UtentiService, 
    private router: Router
  ) {}


  ngOnInit(): void {
    this.currentUrl = this.router.url;
    if(this.currentUrl === "/profilo-utente"){
      let utenteLoggatoString = sessionStorage.getItem("utenteLoggato")
      this.user = utenteLoggatoString !== null ? JSON.parse(utenteLoggatoString) : null;
    } 
    else if(this.currentUrl !== "/aggiungi-utente")
        this.user = history.state.elem;
  }

  togglePasswordVisibility() {
    this.passwordVisibile = !this.passwordVisibile;
    const password = document.getElementById('password') as HTMLInputElement;
    password.type = this.passwordVisibile ? 'text' : 'password';
  }

  async onSubmit() {
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
        await this.userService.updateUser(this.user);
        alert("utente aggiornato");
        this.router.navigateByUrl("/homepage")
      }
      catch(e) {
        alert("errore durante l'aggiornamento dati: " + e)
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
