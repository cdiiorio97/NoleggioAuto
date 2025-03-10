import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyHeaders } from '../../my-table-config';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  @Input() campi?: MyHeaders[] = []
  @Output() aggiornaFiltriClick = new EventEmitter<{ field: string, type: string, input: any }>();
  @Output() aggiornaRangeFiltriClick = new EventEmitter<{ field: string, type: string, inputMin: any, inputMax: any }>();

  tipoFiltro: string = "";
  valoreFiltro: string = '';
  valoreFiltroMin: any;
  valoreFiltroMax: any;
  valoreBoolean: boolean | undefined;
  campoFiltro: string = '';

  aggiornaCampoFiltro(): void {
    let campo = this.campi?.find(elem => elem.field === this.campoFiltro)
    this.tipoFiltro = campo?.type || ''
    this.valoreFiltro= '';
  }

  aggiornaFiltro(){
    if(this.tipoFiltro === "date")
      this.aggiornaRangeFiltriClick.emit({ field: this.campoFiltro, type: this.tipoFiltro, 
                                          inputMin: this.valoreFiltroMin ?? undefined, 
                                          inputMax: this.valoreFiltroMax ?? undefined})
    else 
      this.aggiornaFiltriClick.emit({ field: this.campoFiltro, type: this.tipoFiltro, input: this.valoreFiltro })
  }

  aggiornaFiltroBoolean(value: boolean){
    this.aggiornaFiltriClick.emit({ field: this.campoFiltro, type: this.tipoFiltro, input: value })
  }
}
