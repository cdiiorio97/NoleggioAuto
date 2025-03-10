import { Component, inject } from '@angular/core';
import { Utente } from '../../config';
import { UtentiService } from '../../services/utenti/utenti.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyActions } from '../my-table/my-table-config';
import { BACK_BUTTON, SAVE_BUTTON, UTENTE_VUOTO, VISIBILITY_BUTTON, VISIBILITY_OFF_BUTTON } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';
import { CryptoService } from '../../services/crypto/crypto.service';
import { DtoUtenteModificato } from '../../dto/DtoUtenteModificato';

@Component({
  selector: 'app-profilo-utente',
  templateUrl: './profilo-utente.component.html',
  styleUrl: './profilo-utente.component.css'
})
export class ProfiloUtenteComponent {
  private userService = inject(UtentiService)
  private router = inject(Router)
  private activeRoute = inject(ActivatedRoute)
  public storageService = inject(StorageService)
  cryptoService = inject(CryptoService)
  user: DtoUtenteModificato = new DtoUtenteModificato(UTENTE_VUOTO);
  oldPasswordVisibile: boolean = false;
  newPasswordVisibile: boolean = false;
  viewPasswordForm: boolean = false
  currentUrl: string = this.router.url;
  goBackAction: MyActions = BACK_BUTTON;
  salvaAction: MyActions = SAVE_BUTTON;
  oldVisibilityAction: MyActions = VISIBILITY_BUTTON;
  newVisibilityAction: MyActions = VISIBILITY_BUTTON;
  actionAllowed: string = "";
  disabledFields: boolean = false;

  ngOnInit(): void {
    let urlId: any;
    this.activeRoute.params.subscribe(param => {
      this.actionAllowed = param['action'];
      urlId = parseInt(param['id'],10)
    })
    if(this.currentUrl === "/profilo-utente/EDIT"){
      this.userService.getUserByEmail(this.storageService.getEmail()).subscribe({
        next: (response) => { this.user = new DtoUtenteModificato(response); }
      })
      this.viewPasswordForm = true;

    }
    else {
        if(urlId !== undefined)
          this.getUserById(urlId);
        this.actionAllowed !== "ADD" ? this.disabledFields = true : this.viewPasswordForm = true;
    }
  }

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (elem: Utente) => { this.user = new DtoUtenteModificato(elem); },
      error: (e) => { alert(e.error.text) }
    })
  }

  togglePasswordVisibility(event: any) {
    console.log(event)
    if(event === "oldPassword"){
      this.oldPasswordVisibile = !this.oldPasswordVisibile;
      this.oldVisibilityAction = this.oldVisibilityAction === VISIBILITY_BUTTON ? VISIBILITY_OFF_BUTTON : VISIBILITY_BUTTON;
    }
    else{
      this.newPasswordVisibile = !this.newPasswordVisibile;
      this.newVisibilityAction = this.newVisibilityAction === VISIBILITY_BUTTON ? VISIBILITY_OFF_BUTTON : VISIBILITY_BUTTON;
    }
  }

  onSubmit() {
      this.userService.gestioneUtente(this.user, this.actionAllowed).subscribe({
        next: (id) => { 
          alert(this.actionAllowed === "ADD" ? "utente aggiunto correttamente" : "utente aggiornato"); 
          this.router.navigateByUrl("/dettagli-utente/EDIT/"+id)
        },
        error: (e) => { alert(e.error); }
      })
  }

  goBack(): void {
    this.router.navigateByUrl("/homepage")
  }
}
