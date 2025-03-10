import { Component, inject } from '@angular/core';
import { Auto } from '../../config';
import { AutoService } from '../../services/auto/auto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyActions } from '../my-table/my-table-config';
import { AUTO_VUOTA, BACK_BUTTON, SAVE_BUTTON } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-dettagli-auto',
  templateUrl: './dettagli-auto.component.html',
  styleUrl: './dettagli-auto.component.css'
})
export class DettagliAutoComponent {
  private carService = inject(AutoService);
  private activeRoute = inject(ActivatedRoute)
  private router = inject(Router);
  public storageService = inject(StorageService)

  auto: Auto = AUTO_VUOTA;
  goBackAction: MyActions = BACK_BUTTON;
  salvaAction: MyActions = SAVE_BUTTON;
  currentUrl: string = this.router.url;
  isAdmin: boolean = this.storageService.getIsAdmin();
  actionAllowed: string = "";

  ngOnInit(): void {
    let urlId;
    this.activeRoute.params.subscribe(param => {
      this.actionAllowed = param['action'];
      urlId = parseInt(param['id'],10)
    })
    if (urlId !== undefined && urlId > 0) 
      this.getAutoById(urlId);
  }

  getAutoById(id:number){
    this.carService.getAutoById(id).subscribe({
      next: (response: Auto) => { this.auto = response },
      error: (e) => { alert(e.error) }
    })
  }

  onSubmit() {
    this.carService.gestioneAuto(this.auto, this.actionAllowed).subscribe({
      next: (response) => {
        alert(this.actionAllowed === "ADD" ? "Auto aggiunta" : "Auto aggiornata");
        this.router.navigateByUrl(`/dettagli-auto/EDIT/${response}`)
      },
      error:(e) => { alert(e.error) }
    })
  }

  goBack(): void {
    this.router.navigateByUrl('/parco-auto')
  }
}
