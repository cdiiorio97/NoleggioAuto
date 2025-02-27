import { Component, inject, Input } from '@angular/core';
import { Auto } from '../../config';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { AutoService } from '../../services/auto/auto.service';
import { AutenticazioneService } from '../../services/login/autenticazione.service';

@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrl: './parco-auto.component.css'
})
export class ParcoAutoComponent {
  automobili: Auto[] = [];
  isAdmin: boolean = false;
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
  private carService = inject(AutoService)
  private authService = inject(AutenticazioneService)

  ngOnInit(): void {
    this.isAdmin = this.authService.getIsAdmin();
    this.getAuto();
  }

  getAuto(): void {
    this.carService.getAutomobili().subscribe({
      next: (data : Auto[]) => {
        console.log(data)
        this.automobili = data;
      },
      error: (e) => {
        alert(e.error.text);
        sessionStorage.setItem("getErrorMessage", e.error.text);
        },
    });
  }


}
