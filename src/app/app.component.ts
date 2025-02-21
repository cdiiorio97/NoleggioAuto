import { Component } from '@angular/core';
import { Config, Utente } from './config';
import { AutenticazioneService } from './autenticazione.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Noleggio Auto';
  autenticato: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AutenticazioneService){}

  ngOnInit(){
    this.authService.getAuthState().subscribe((isLogged: boolean) => {
      this.autenticato= isLogged;
      console.log(this.autenticato)
    })
    this.authService.getIsAdmin().subscribe((isAdmin: boolean) => {
      this.isAdmin = isAdmin;
      this.mostraNavBar();
      console.log(this.isAdmin);
    });
  }

  mostraNavBar() {
    this.config.navHeaders = this.config?.navHeaders?.map(header => {
      if (header.label === 'Prenotazioni') {
        header.visibile = this.isAdmin;
      }
      return header;
    });
  }

  config: Config = {
    navHeaders: [
      { label:'HomePage', link: '/homepage', visibile: true},
      { label:'Parco Auto', link: '/parco-auto', visibile: true},
      { label:'Profilo Utente', link: '/profilo-utente', visibile: true},
      { label:'Prenotazioni', link: '/prenotazioni', visibile: this.isAdmin}
    ],
    utenti: []
  } 
}