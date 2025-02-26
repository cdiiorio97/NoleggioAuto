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
  logoutAction: MyActions | undefined;
  editAction: MyActions | undefined;
  addAction: MyActions | undefined;
  deleteAction: MyActions | undefined;
  goBackAction: MyActions | undefined;

  constructor(
    public authService: AutenticazioneService,
    private router: Router
  ){}
  
  isAdmin: boolean = false;
  titleAdmin = 'Benvenuto Admin';
  titleUtente = 'Benvenuto User';
  
  actions: MyActions[] =[
    { 
      field: "edit",
      icon: "edit",
      iconPosition: "left",
      css: {
        "margin-top": "5px", 
        "height": "30px", 
        "margin-right": "5px", 
        "border-radius": "10px",
        "border-color": "lightblue", 
        "background-color": "lightblue"
      } 
    },
    {  
      field: "delete",
      icon:"delete",
      iconPosition:"right",
      css: {
        "display": "flex",
        "flex-direction": "row",
        "margin-top": "5px",
        "height": "30px", 
        "width": "fit-content",
        "padding": "10px",
        "background-color": "red", 
        "border-radius": "10px",
        "align-items":"center"
      } 
    },
    { label: "Aggiungi",
      field: "add",
      icon: "add",
      iconPosition: "right",
      css: {
        "display": "flex",
        "flex-direction": "row",
        "margin-top": "0", 
        "height": "30px", 
        "width": "fit-content",
        "padding": "10px",
        "border-radius": "10px",
        "border": "none", 
        "background-color": "#2f8131",
        "color": "white",
        "font-weight": "bold",
        "align-items":"center"
      } 
    },
    {
      label: "LOGOUT",
      field: "logout",
      icon: "logout",
      iconPosition: "left",
      css: {
        "display": "flex",
        "flex-direction": "row",
        "margin-top": "5px", 
        "height": "30px", 
        "width": "fit-content",
        "padding": "10px",
        "margin-right": "5px", 
        "border-radius": "10px",
        "background-color": "grey",
        "color": "white",
        "align-items":"center"
      }
    },
    {
      label: "GO BACK",
      field: "goBack",
      icon: "arrow_back",
      iconPosition: "left",
      css: {
        "display": "flex",
        "flex-direction": "row",
        "gap": "10px",
        "margin-top": "5px", 
        "height": "30px", 
        "width": "fit-content",
        "padding": "10px",
        "margin-right": "5px", 
        "border-radius": "10px",
        "background-color": "grey",
        "color": "white",
        "align-items":"center"
      }
    }
  ]

  ngOnInit(){
    this.authService.setIsLogged();
    this.authService.setIsAdmin();
    this.logoutAction = this.actions.find(elem => elem.field === "logout")
    
    this.editAction = this.actions.find(elem => elem.field === "edit")
    this.addAction = this.actions.find(elem => elem.field === "add")
    this.deleteAction = this.actions.find(elem => elem.field === "delete")
    this.goBackAction = this.actions.find(elem => elem.field === "goBack")
    sessionStorage.setItem("editAction", this.editAction ? JSON.stringify(this.editAction) : '');
    sessionStorage.setItem("addAction", this.editAction ? JSON.stringify(this.addAction) : '');
    sessionStorage.setItem("deleteAction", this.editAction ? JSON.stringify(this.deleteAction) : '');
    sessionStorage.setItem("goBackAction", this.goBackAction ? JSON.stringify(this.goBackAction) : '');
  }

  config: Config = {
    navHeaders: [
      { label: 'HomePage', field: 'homepage', link: '/homepage', visibile: true },
      { label: 'Parco Auto', field: 'parco-auto', link: '/parco-auto', visibile: true },
      { label: 'Profilo Utente', field: 'profilo-utente', link: '/profilo-utente', visibile: true },
      { label: 'Prenotazioni', field: 'prenotazioni', link: '/prenotazioni', visibile: true }
    ]
  }

  logout(){
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
   
}