import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeadersComponent } from './nav-headers/nav-headers.component';
import { ParcoAutoComponent } from './parco-auto/parco-auto.component';
import { HomepageComponent } from './homepage/homepage.component';
import { PrenotazioniComponent } from './prenotazioni/prenotazioni.component';
import { ProfiloUtenteComponent } from './profilo-utente/profilo-utente.component';
import { ButtonComponent } from './button/button.component';
import { MyTableComponent } from './my-table/my-table.component';
import { PaginazionePipe } from './paginazione.pipe';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { AutenticazioneService } from './autenticazione.service';

@NgModule({
  declarations: [
    AppComponent,
    NavHeadersComponent,
    ParcoAutoComponent,
    HomepageComponent,
    PrenotazioniComponent,
    ProfiloUtenteComponent,
    PaginazionePipe,
    ButtonComponent,
    MyTableComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AutenticazioneService],
  bootstrap: [AppComponent]
})
export class AppModule { }
