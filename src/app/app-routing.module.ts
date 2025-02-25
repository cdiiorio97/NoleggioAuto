import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ParcoAutoComponent } from './components/parco-auto/parco-auto.component';
import { ProfiloUtenteComponent } from './components/profilo-utente/profilo-utente.component';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DettagliPrenotazioneComponent } from './components/dettagli-prenotazione/dettagli-prenotazione.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'parco-auto', component: ParcoAutoComponent },
  { path: 'profilo-utente', component: ProfiloUtenteComponent },
  { path: 'dettagli-utente/:id', component: ProfiloUtenteComponent },
  { path: 'dettagli-prenotazione/:id', component: DettagliPrenotazioneComponent},
  { path: 'aggiungi-utente', component: ProfiloUtenteComponent},
  { path: 'prenotazioni', component: PrenotazioniComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
