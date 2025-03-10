import { Component, inject } from '@angular/core';
import { Auto } from '../../config';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { AutoService } from '../../services/auto/auto.service';
import { Router } from '@angular/router';
import { DELETE_BUTTON, EDIT_BUTTON, VIEW_DETAILS_BUTTON } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrl: './parco-auto.component.css'
})
export class ParcoAutoComponent {
  private carService = inject(AutoService)
  public storageService = inject(StorageService)
  private router = inject(Router)
  automobili: Auto[] = [];
  isAdmin: boolean = this.storageService.getIsAdmin();
  headers: MyHeaders[] = [
    { name: "ID", field: "id", sorting: 'asc', visibile: true, css:{'width': '5%', "align-items": "center"}, type: "string" },
    { name: "Brand", field: "brand", sorting: 'asc', visibile: true, type: "string" },
    { name: "Modello", field: "modello", sorting: 'asc', visibile: true, type: "string" },
    { name: "Targa", field: "targa", sorting: 'asc', visibile: true, type: "string" },
    { name: "Actions", field: "actions", sorting: 'asc', visibile: true, css:{ "border":"none", "background-color":"white", "display":"none", "max-width":"250px" } }
  ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8, numeroPagine: [1] },
    myActions: [],
    aggiuntaUrl: ""
  }
  datiCaricati: boolean = false;

  ngOnInit(): void {
    if(this.tableConfig.myActions){
      if(this.isAdmin){
        this.tableConfig.myActions.push(EDIT_BUTTON, DELETE_BUTTON)
        this.tableConfig.aggiuntaUrl = '/dettagli-auto/ADD'
      }
      else
        this.tableConfig.myActions.push(VIEW_DETAILS_BUTTON)
    }
    this.getAuto();
  }

  getAuto(): void {
    this.carService.getAutomobili().subscribe({
      next: (data : Auto[]) => { 
        this.automobili = data;
        if(!this.isAdmin)
          this.automobili.forEach((elem) => { elem.viewOnly = true; }) 
        else 
          this.automobili.forEach((elem) => { elem.editabile = true; })
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
        this.router.navigateByUrl(`/dettagli-auto/EDIT/${event.row.id}`)
        break;
      case 'viewDetails':
        this.router.navigateByUrl(`/dettagli-auto/VIEW/${event.row.id}`)
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
