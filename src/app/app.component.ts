import { ChangeDetectorRef, Component } from '@angular/core';
import { Config } from './config';
import { MyActions } from './components/my-table/my-table-config';
import { AutenticazioneService } from './services/login/autenticazione.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    public authService: AutenticazioneService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}
  
  isAdmin: boolean = false;
  titleAdmin = 'Benvenuto Admin';
  titleUtente = 'Benvenuto User';

  ngOnInit(){
    this.authService.setIsLogged();
  }
  
  config: Config = {
    navHeaders: [
      { label:'HomePage', field: 'homepage', link: '/homepage', visibile: true},
      { label:'Parco Auto', field: 'parco-auto', link: '/parco-auto', visibile: true},
      { label:'Profilo Utente', field: 'profilo-utente', link: '/profilo-utente', visibile: true},
      { label:'Prenotazioni', field: 'prenotazioni', link: '/prenotazioni', visibile: true}
    ]
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  logoutButton: MyActions = {
    label: "LOGOUT",
    field: "logout",
    css: {
      "margin-top": "5px", 
      "height": "30px", 
      "width": "80px",
      "margin-right": "5px", 
      "border-radius": "10px",
      "background-color": "grey"
    }
  }
   
}