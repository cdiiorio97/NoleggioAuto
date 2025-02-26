import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Utente } from '../../config';
import { UtentiService } from '../../services/utenti/utenti.service';
import { MyActions } from '../my-table/my-table-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dettagli-utente',
  templateUrl: './dettagli-utente.component.html',
  styleUrl: './dettagli-utente.component.css'
})
export class DettagliUtenteComponent {
  goBackAction: MyActions | undefined;
  
  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.goBackAction = JSON.parse(sessionStorage.getItem("goBackAction") ?? '')
  }

  goBack(): void {
    this.router.navigateByUrl("/homepage")
  }
}

