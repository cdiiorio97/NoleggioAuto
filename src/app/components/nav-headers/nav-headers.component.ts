import { Component, inject, Input } from '@angular/core';
import { NavHeader } from '../../config';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-nav-headers',
  templateUrl: './nav-headers.component.html',
  styleUrl: './nav-headers.component.css'
})
export class NavHeadersComponent {
  @Input() navHeaders: NavHeader[] | undefined;
  public storageService = inject(StorageService)
  
  ngOnInit(){
    this.navHeaders?.map(elem => {
        if(elem.field === "prenotazioni" || elem.field === "richieste-prenotazioni")
          elem.visibile = this.storageService.getIsAdmin();
    })
  }
}
