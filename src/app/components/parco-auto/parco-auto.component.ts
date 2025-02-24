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
  @Input() auto: Auto[] | undefined;
  headers: MyHeaders[] = [];
  tableConfig: MyTableConfig | undefined;

  constructor(private autoService: AutoService, private tabellaService: TabellaService){ }

  ngOnInit(): void {
    if(!this.auto){
      this.autoService.getAutomobili()
        .subscribe((data : any) => {
          this.auto = data;
      });
    }
    if (this.auto && this.auto.length > 0) {
      this.tabellaService.getHeaders("auto")
                          .subscribe((headers: MyHeaders[]) => {
                            this.headers = headers 
                          });
    }

    this.tableConfig = {
      headers: this.headers.filter(elem => elem.visibile),
      pagination: { itemPerPage: 8 },
      actions: undefined,
    }
  }

  
}
