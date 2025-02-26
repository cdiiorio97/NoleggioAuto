import { Component, Input } from '@angular/core';
import { NavHeader } from '../../config';

@Component({
  selector: 'app-nav-headers',
  templateUrl: './nav-headers.component.html',
  styleUrl: './nav-headers.component.css'
})
export class NavHeadersComponent {
  @Input() navHeaders: NavHeader[] | undefined;

  ngOnInit(){
    let isAdmin = sessionStorage.getItem("isAdmin") === "true" ? true : false;
    this.navHeaders?.map(elem => {
        if(elem.field === "prenotazioni" || elem.field === "richieste-prenotazioni")
          elem.visibile = isAdmin;
    })
  }
}
