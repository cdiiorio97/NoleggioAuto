import { Component, inject } from '@angular/core';
import { Auto } from '../../config';
import { AutoService } from '../../services/auto/auto.service';
import { Router } from '@angular/router';
import { MyActions } from '../my-table/my-table-config';
import { BACK_BUTTON } from '../../costanti';
import { AutenticazioneService } from '../../services/login/autenticazione.service';

@Component({
  selector: 'app-dettagli-auto',
  templateUrl: './dettagli-auto.component.html',
  styleUrl: './dettagli-auto.component.css'
})
export class DettagliAutoComponent {
  private carService = inject(AutoService);
  private authService = inject(AutenticazioneService)
  private router = inject(Router);

  auto: Auto = {
    id: 0,
    targa: '',
    brand: '',
    modello: ''
  }
  goBackAction: MyActions = BACK_BUTTON;
  currentUrl: string = this.router.url;
  isAdmin: boolean = this.authService.getIsAdmin();

  ngOnInit(): void {
    if(this.currentUrl !== "/aggiungi-auto"){
      const match = this.currentUrl.match(/\/dettagli-auto\/(\d+)/);
      if (match) {
        const numero = parseInt(match[1], 10);
        this.getAutoById(numero);
      }
    }
  }

  getAutoById(id:number){
    this.carService.getAutoById(id).subscribe({
      next: (response: Auto) => { this.auto = response }
    })
  }

  async onSubmit() {
    if(this.currentUrl === "/aggiungi-auto"){
      try{
        await this.carService.addAuto(this.auto)
        alert("auto aggiunta")
        this.router.navigateByUrl("/parco-auto")
      } catch (e){
        alert(`errore durante l'aggiunta: ${e}`)
      }
    }
    else {
      try{
        await this.carService.updateAuto(this.auto);
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
