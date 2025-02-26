import { Component, Input } from '@angular/core';
import { Auto } from '../../config';
import { Location } from '@angular/common';
import { AutoService } from '../../services/auto/auto.service';
import { Router } from '@angular/router';

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

  constructor(
    private location: Location,
    private autoService: AutoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const autoState = history.state.elem;
    if (autoState) {
      this.auto = autoState;
    }
  }

  async onSubmit() {
    if(!this.auto){
      try{
        await this.autoService.addAuto(this.auto)
        alert("auto aggiunta")
        this.location.back();
      } catch (e){
        alert("errore durante l'aggiunta: " + e)
      }
    }
    else {
      try{
        await this.autoService.updateAuto(this.auto);
        alert("auto aggiornata");
        this.location.back();
      }
      catch(e) {
        alert("errore durante l'aggiornamento dati: " + e)
      }
    }
  }

  goBack(): void {
    this.router.navigateByUrl('/parco-auto')
  }
}
