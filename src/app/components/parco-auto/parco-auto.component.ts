import { Component, Input } from '@angular/core';
import { Auto } from '../../config';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { AutoService } from '../../services/auto/auto.service';
import { TabellaService } from '../../services/tabella/tabella.service';

@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrl: './parco-auto.component.css'
})
export class ParcoAutoComponent {
  auto: Auto[] | undefined;
  headers: MyHeaders[] = [
    { name: "ID", field: "id", sorting: 'asc', visibile: true },
    { name: "Produttore", field: "brand", sorting: 'asc', visibile: true },
    { name: "Modello", field: "modello", sorting: 'asc', visibile: true },
    { name: "Targa", field: "targa", sorting: 'asc', visibile: true },
  ];

  constructor(private autoService: AutoService, private tabellaService: TabellaService){ }

  ngOnInit(): void {
      this.autoService.getAutomobili()
          .subscribe((data : any) => {
            this.auto = data;
    });
  }

  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8 },
    actions: undefined,
  }


}
