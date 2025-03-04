import { Component, inject } from '@angular/core';
import { Config } from './config';
import { MyActions } from './components/my-table/my-table-config';
import { AutenticazioneService } from './services/login/autenticazione.service';
import { Router } from '@angular/router';
import { ACCEPT_BUTTON, ADD_BUTTON, BACK_BUTTON, DELETE_BUTTON, EDIT_BUTTON, LOGOUT_BUTTON, REFUSE_BUTTON } from './costanti';
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
  editAction: MyActions = EDIT_BUTTON;
  addAction: MyActions = ADD_BUTTON;
  deleteAction: MyActions = DELETE_BUTTON;
  goBackAction: MyActions = BACK_BUTTON;
  accettaAction: MyActions = ACCEPT_BUTTON;
  rifiutaAction: MyActions = REFUSE_BUTTON;
  
  isAdmin: boolean = this.storageService.getIsAdmin();
  titleAdmin = 'Benvenuto Admin';
  titleUtente = 'Benvenuto User';

  config: Config = {
    navHeaders: [
      { label: 'HomePage', field: 'homepage', link: '/homepage', visibile: true },
      { label: 'Parco Auto', field: 'parco-auto', link: '/parco-auto', visibile: true },
      { label: 'Profilo Utente', field: 'profilo-utente', link: '/profilo-utente', visibile: true },
      { label: 'Prenotazioni', field: 'prenotazioni', link: '/prenotazioni', visibile: true },
      { label: 'Nuove Richieste', field: 'richieste-prenotazioni', link:'/richieste-prenotazioni', visibile: true}
    ]
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
   
}