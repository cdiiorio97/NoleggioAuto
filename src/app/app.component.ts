import { Component, inject } from '@angular/core';
import { NavHeader } from './config';
import { MyActions } from './components/my-table/my-table-config';
import { AutenticazioneService } from './services/login/autenticazione.service';
import { Router } from '@angular/router';
import { LOGOUT_BUTTON } from './costanti';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  public authService = inject(AutenticazioneService)
  public storageService = inject(StorageService)
  private router = inject(Router)
  logoutAction: MyActions = LOGOUT_BUTTON;
  
  isAdmin: boolean = this.storageService.getIsAdmin();
  titleAdmin = 'Benvenuto Admin';
  titleUtente = 'Benvenuto User';

  navHeaders: NavHeader[] = [
    { label: 'HomePage', field: 'homepage', link: '/homepage', visibile: true },
    { label: 'Parco Auto', field: 'parco-auto', link: '/parco-auto', visibile: true },
    { label: 'Profilo Utente', field: 'profilo-utente', link: '/profilo-utente/EDIT', visibile: true }
  ]

  ngOnInit(){
    if(this.storageService.getIsAdmin())
      this.aggiungiTabAdmin();
  }

  logout(){
    this.rimuoviTabAdmin();
    this.authService.logout();
    this.storageService.clean()
    this.router.navigateByUrl("/login");
  }
   
  impostaNavBar(isAdmin: any): void {
    isAdmin ? this.aggiungiTabAdmin() : this.rimuoviTabAdmin();
  }

  rimuoviTabAdmin(){
    if(this.navHeaders){
      for(let i = this.navHeaders.length - 1; i >= 0; i--) {
        if ( this.navHeaders[i].field === 'prenotazioni' || this.navHeaders[i].field === 'richieste-prenotazioni' ) 
          this.navHeaders.splice(i, 1);
      }
    }
  }

  aggiungiTabAdmin(){
    this.navHeaders?.push(
      { label: 'Prenotazioni', field: 'prenotazioni', link: '/prenotazioni', visibile: true },
      { label: 'Nuove Richieste', field: 'richieste-prenotazioni', link:'/richieste-prenotazioni', visibile: true }
    );
  }
}