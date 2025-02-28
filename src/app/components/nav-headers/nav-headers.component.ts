import { Component, inject, Input } from '@angular/core';
import { NavHeader } from '../../config';
import { AutenticazioneService } from '../../services/login/autenticazione.service';

@Component({
  selector: 'app-nav-headers',
  templateUrl: './nav-headers.component.html',
  styleUrl: './nav-headers.component.css'
})
export class NavHeadersComponent {
  @Input() navHeaders: NavHeader[] | undefined;
  private authService = inject(AutenticazioneService)

  isAdmin: boolean = this.authService.getIsAdmin();

  ngOnInit(){
    this.navHeaders?.map(elem => {
        if(elem.field === "prenotazioni" || elem.field === "richieste-prenotazioni")
          elem.visibile = this.isAdmin;
    })
  }
}
