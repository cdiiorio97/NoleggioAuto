import { Component, inject } from '@angular/core';
import { Auto } from '../../config';
import { MyActions, MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { AutoService } from '../../services/auto/auto.service';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { Router } from '@angular/router';
import { DELETE_BUTTON, EDIT_BUTTON, VIEW_DETAILS_BUTTON } from '../../costanti';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrl: './parco-auto.component.css'
})
export class ParcoAutoComponent {
  private carService = inject(AutoService)
  private authService = inject(AutenticazioneService)
  private router = inject(Router)
  automobili: Auto[] = [];
  isAdmin: boolean = this.authService.getIsAdmin();
  headers: MyHeaders[] = [
    { name: "ID", field: "id", sorting: 'asc', visibile: true },
    { name: "Produttore", field: "brand", sorting: 'asc', visibile: true },
    { name: "Modello", field: "modello", sorting: 'asc', visibile: true },
    { name: "Targa", field: "targa", sorting: 'asc', visibile: true },
    { name: "Actions", field: "actions", sorting: 'asc', visibile: true }
  ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8 }
  }
  actionsTabella: MyActions[] = []
  datiCaricati: boolean = false;

  ngOnInit(): void {
    if(this.isAdmin){
      this.actionsTabella.push(EDIT_BUTTON)
      this.actionsTabella.push(DELETE_BUTTON)
    }
    else
      this.actionsTabella.push(VIEW_DETAILS_BUTTON)
    this.getAuto();
  }

  getAuto(): void {
    this.carService.getAutomobili().subscribe({
      next: (data : Auto[]) => { 
        this.automobili = data;
        if(!this.isAdmin)
          this.automobili.map((elem) => { elem.viewOnly = true; }) 
        else 
          this.automobili.map((elem) => { elem.editabile = true; })
      },
      error: (e) => { alert(e.error.text); },
      complete: () => { this.datiCaricati = true}
    });
  }

  handleAction(event: { action: string, row: Auto }): void {
    switch(event.action){
      case 'delete':
        this.onDelete(event.row)
        break;
      case 'edit':
      case 'viewDetails':
        this.router.navigateByUrl(`/dettagli-auto/${event.row.id}`)
        break;
    }
  }

  onDelete(row: Auto): void {
    if (confirm(`Sei sicuro di voler eliminare la prenotazione con ID ${row.id}?`)) {
      this.carService.deleteAuto(row.id).subscribe({
        next: (response) => {
          alert(response) 
          window.location.reload();
        },
        error: (error) => { alert(error.error) }
      });
    }
  }
}
