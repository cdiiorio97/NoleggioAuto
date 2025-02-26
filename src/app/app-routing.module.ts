import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ParcoAutoComponent } from './components/parco-auto/parco-auto.component';
import { ProfiloUtenteComponent } from './components/profilo-utente/profilo-utente.component';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DettagliPrenotazioneComponent } from './components/dettagli-prenotazione/dettagli-prenotazione.component';
import { DettagliUtenteComponent } from './components/dettagli-utente/dettagli-utente.component';
import { DettagliAutoComponent } from './components/dettagli-auto/dettagli-auto.component';
import { RichiestePrenotazioniComponent } from './components/richieste-prenotazioni/richieste-prenotazioni.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'parco-auto', component: ParcoAutoComponent },
  { path: 'profilo-utente', component: ProfiloUtenteComponent },
  { path: 'dettagli-utente/:id', component: DettagliUtenteComponent },
  { path: 'dettagli-prenotazione/:id', component: DettagliPrenotazioneComponent },
  { path: 'dettagli-auto/:id', component: DettagliAutoComponent },
  { path: 'aggiungi-utente', component: ProfiloUtenteComponent },
  { path: 'aggiungi-prenotazione', component: DettagliPrenotazioneComponent },
  { path: 'aggiungi-auto', component: DettagliAutoComponent },
  { path: 'prenotazioni', component: PrenotazioniComponent },
  { path: 'prenotazioni/:id', component: PrenotazioniComponent },
  { path: 'richieste-prenotazioni', component: RichiestePrenotazioniComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
