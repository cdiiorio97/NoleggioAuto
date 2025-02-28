import { Component, inject } from '@angular/core';
import { MyActions } from '../my-table/my-table-config';
import { Router } from '@angular/router';
import { BACK_BUTTON } from '../../costanti';

@Component({
  selector: 'app-dettagli-utente',
  templateUrl: './dettagli-utente.component.html',
  styleUrl: './dettagli-utente.component.css'
})
export class DettagliUtenteComponent {
  private router = inject(Router)
  goBackAction: MyActions = BACK_BUTTON;

  goBack(): void {
    this.router.navigateByUrl("/homepage")
  }
}

