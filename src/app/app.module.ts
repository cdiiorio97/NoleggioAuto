import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavHeadersComponent } from './components/nav-headers/nav-headers.component';
import { ParcoAutoComponent } from './components/parco-auto/parco-auto.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PrenotazioniComponent } from './components/prenotazioni/prenotazioni.component';
import { ProfiloUtenteComponent } from './components/profilo-utente/profilo-utente.component';
import { MyTableComponent } from './components/my-table/my-table.component';
import { PaginazionePipe } from './pipes/paginazione.pipe';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AutenticazioneService } from './services/login/autenticazione.service';
import { DettagliPrenotazioneComponent } from './components/dettagli-prenotazione/dettagli-prenotazione.component';
import { DettagliUtenteComponent } from './components/dettagli-utente/dettagli-utente.component';
import { DettagliAutoComponent } from './components/dettagli-auto/dettagli-auto.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from './components/button/button.component';
import { RichiestePrenotazioniComponent } from './components/richieste-prenotazioni/richieste-prenotazioni.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './HttpRequestInterceptor';
import { FiltroComponent } from './components/my-table/filtroTabella/filtro/filtro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavHeadersComponent,
    PrenotazioniComponent,
    PaginazionePipe,
    ButtonComponent,
    MyTableComponent,
    ProfiloUtenteComponent,
    HomepageComponent,
    ParcoAutoComponent,
    LoginPageComponent,
    DettagliPrenotazioneComponent,
    DettagliUtenteComponent,
    DettagliAutoComponent,
    RichiestePrenotazioniComponent,
    FiltroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [AutenticazioneService, provideAnimationsAsync(), DateFormatPipe, httpInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
