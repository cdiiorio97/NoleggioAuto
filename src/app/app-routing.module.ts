import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ParcoAutoComponent } from './components/parco-auto/parco-auto.component';
import { ProfiloUtenteComponent } from './components/profilo-utente/profilo-utente.component';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';
import { DettagliPrenotazioneComponent } from './components/dettagli-prenotazione/dettagli-prenotazione.component';
import { DettagliUtenteComponent } from './components/dettagli-utente/dettagli-utente.component';
import { DettagliAutoComponent } from './components/dettagli-auto/dettagli-auto.component';
import { RichiestePrenotazioniComponent } from './components/richieste-prenotazioni/richieste-prenotazioni.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AppComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'parco-auto', component: ParcoAutoComponent },
  { path: 'profilo-utente/:action', component: ProfiloUtenteComponent },
  { path: 'dettagli-utente/:action', component: DettagliUtenteComponent },
  { path: 'dettagli-utente/:action/:id', component: DettagliUtenteComponent },
  { path: 'dettagli-prenotazione/:action', component: DettagliPrenotazioneComponent },  
  { path: 'dettagli-prenotazione/:action/:id', component: DettagliPrenotazioneComponent },
  { path: 'dettagli-auto/:action', component: DettagliAutoComponent },
  { path: 'dettagli-auto/:action/:id', component: DettagliAutoComponent },
  { path: 'prenotazioni', component: PrenotazioniComponent },
  { path: 'prenotazioni-utente/:id', component: PrenotazioniComponent },
  { path: 'richieste-prenotazioni', component: RichiestePrenotazioniComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
