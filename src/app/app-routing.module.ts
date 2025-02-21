import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ParcoAutoComponent } from './parco-auto/parco-auto.component';
import { ProfiloUtenteComponent } from './profilo-utente/profilo-utente.component';
import { PrenotazioniComponent } from './prenotazioni/prenotazioni.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'parco-auto', component: ParcoAutoComponent },
  { path: 'profilo-utente/:id', component: ProfiloUtenteComponent },
  { path: 'prenotazioni', component: PrenotazioniComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
