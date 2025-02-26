import { Component, Input } from '@angular/core';
import { Auto } from '../../config';
import { Location } from '@angular/common';
import { AutoService } from '../../services/auto/auto.service';
import { Router } from '@angular/router';
import { MyActions } from '../my-table/my-table-config';

@Component({
  selector: 'app-dettagli-auto',
  templateUrl: './dettagli-auto.component.html',
  styleUrl: './dettagli-auto.component.css'
})
export class DettagliAutoComponent {
  auto: Auto = {
    id: 0,
    targa: '',
    brand: '',
    modello: ''
  }
  passwordVisibile: boolean = false;
  goBackAction: MyActions | undefined;
  currentUrl: string = '';

  constructor(
    private autoService: AutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    this.goBackAction = JSON.parse(sessionStorage.getItem("goBackAction") ?? '')
    if(this.currentUrl !== "/aggiungi-auto")
      this.auto = history.state.elem;
  }

  async onSubmit() {
    if(this.currentUrl === "/aggiungi-auto"){
      try{
        await this.autoService.addAuto(this.auto)
        alert("auto aggiunta")
        this.router.navigateByUrl("/parco-auto")
      } catch (e){
        alert(`errore durante l'aggiunta: ${e}`)
      }
    }
    else {
      try{
        await this.autoService.updateAuto(this.auto);
        alert("auto aggiornata");
        this.router.navigateByUrl("/parco-auto")
      }
      catch(e) {
        alert(`errore durante l'aggiornamento dati: ${e}`)
      }
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/parco-auto')
  }
}
