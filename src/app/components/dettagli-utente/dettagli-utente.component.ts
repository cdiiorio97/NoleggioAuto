import { Component, inject } from '@angular/core';
import { MyActions } from '../my-table/my-table-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dettagli-utente',
  templateUrl: './dettagli-utente.component.html',
  styleUrl: './dettagli-utente.component.css'
})
export class DettagliUtenteComponent {
  goBackAction: MyActions | undefined;
  private router = inject(Router)

  ngOnInit(): void {
    this.goBackAction = JSON.parse(sessionStorage.getItem("goBackAction") ?? '')
  }

  goBack(): void {
    this.router.navigateByUrl("/homepage")
  }
}

