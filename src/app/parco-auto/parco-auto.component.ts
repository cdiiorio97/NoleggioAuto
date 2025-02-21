import { Component, Input } from '@angular/core';
import { Auto } from '../config';
import { AutoService } from '../auto.service';
import { MyHeaders, MyTableConfig } from '../my-table/my-table-config';

@Component({
  selector: 'app-parco-auto',
  templateUrl: './parco-auto.component.html',
  styleUrl: './parco-auto.component.css'
})
export class ParcoAutoComponent {
  @Input() auto: Auto[] | undefined;
  headers: MyHeaders[] = [];
  tableConfig: MyTableConfig | undefined;
  autoDummy : Auto = {
    id: 0,
    targa: '',
    brand: '',
    modello: ''
  }

  constructor(private autoService: AutoService){ }

  ngOnInit(): void {
    if(!this.auto){
      this.autoService.getAutomobili()
        .subscribe((data : any) => {
          this.auto = data;
      });
    }
    if (this.auto && this.auto.length > 0) {
      this.headers = Object.keys(this.autoDummy).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      field: key,
      sorting: 'asc'
      }));
    }

    this.tableConfig = {
      headers: this.headers,
      pagination: { itemPerPage: 8 },
      actions: undefined,
    }
  }

  
}
