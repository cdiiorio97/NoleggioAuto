import { Component, inject, OnInit } from '@angular/core';
import { MyActions, MyHeaders, MyTableConfig } from '../my-table/my-table-config';
import { PrenotazioniService } from '../../services/prenotazioni/prenotazioni.service';
import { Prenotazione } from '../../config';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { BACK_BUTTON, DELETE_BUTTON, EDIT_BUTTON, VIEW_DETAILS_BUTTON } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';
import { DtoPrenotazioneTabella } from '../../dto/DtoPrenotazioneTabella';
import { UtentiService } from '../../services/utenti/utenti.service';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.component.html',
  styleUrl: './prenotazioni.component.css'
})
export class PrenotazioniComponent implements OnInit {
  private prenotazioneService = inject(PrenotazioniService);
  private userService = inject(UtentiService)
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute)
  private datePipe = inject(DateFormatPipe);
  public storageService = inject(StorageService)

  prenotazioniTabella: DtoPrenotazioneTabella[] = [];
  utenteSelezionato: string = "";
  backButtonVisibile: boolean = false;
  goBackAction: MyActions = BACK_BUTTON;
  headers: MyHeaders[] = [
    { name: "ID", field: "id", sorting: 'asc', visibile: true, css:{'width': '5%', "align-items": "center"}, type: "string"  },
    { name: "Auto", field: "auto", sorting: 'asc', visibile: true, type: "string" },
    { name: "Data Inizio", field: "dataInizio", sorting: 'asc', visibile: true, type: "date" },
    { name: "Data Fine", field: "dataFine", sorting: 'asc', visibile: true, type: "date" },
    { name: "Confermata", field: "confermata", sorting: 'asc', visibile: true, css:{'width': '5%', "align-items": "center"}, type: "boolean"  },
    { name: "Data Conferma", field: "dataConferma", sorting: 'asc', visibile: true, type: "date" },
    { name: "Confermata Da", field: "confermataDa", sorting: 'asc', visibile: true, type: "string" },
    { name: "Rifiutata", field: "rifiutata", sorting: 'asc', visibile: true, css:{'width': '5%', "align-items": "center"}, type: "boolean"  },
    { name: "Data Rifiuto", field: "dataRifiuto", sorting: 'asc', visibile: true, type: "date" },
    { name: "Rifiutata Da", field: "rifiutataDa", sorting: 'asc', visibile: true, type: "string" },
    { name: "Actions", field: "actions", sorting: 'asc', visibile: true, css:{ "border":"none", "background-color":"white", "display":"none", "max-width":"250px" } },
  ];
  tableConfig: MyTableConfig = {
    headers: this.headers.filter(elem => elem.visibile),
    pagination: { itemPerPage: 8, numeroPagine: [1] },
    myActions: [VIEW_DETAILS_BUTTON],
    aggiuntaUrl: ""
  };
  currentUrl: string = this.router.url;
  datiCaricati: boolean = false;

  ngOnInit(): void {
    if(!this.storageService.getIsAdmin()){
      this.tableConfig.myActions?.push(EDIT_BUTTON)
      this.tableConfig.myActions?.push(DELETE_BUTTON)
      this.tableConfig.aggiuntaUrl = "/dettagli-prenotazione/ADD"
    }
    this.caricaPrenotazioni()
  }

  caricaPrenotazioni(){
    if (this.currentUrl === "/prenotazioni"){
      if(this.storageService.getIsAdmin()){
        this.tableConfig.headers?.splice(1,0,
          { name: "Utente", field: "utente", sorting: 'asc', visibile: true, type: "string" }
        )
        this.getPrenotazioniAdmin();
      }
    }
    else {
      if(this.storageService.getIsAdmin()){
        this.backButtonVisibile = true;
        this.activeRoute.params.subscribe(param=>{
          const id = parseInt(param["id"], 10);
          if (id !== null) {
            this.prenotazioneService.getPrenotazioniByUtenteId(id).subscribe({ 
              next: (response: Prenotazione[]) => { 
                this.formattaInformazioni(response); 
                this.getUtenteById(id);
              },
              error: (e) => { alert(e.error.text) },
              complete: () => { this.datiCaricati = true }
            })
            this.tableConfig.headers = this.tableConfig.headers?.filter(elem => elem.field !== "utente")
          }
        })
      }
      else
        this.getPrenotazioniByUserEmail(this.storageService.getEmail());
    }
  }

  getUtenteById(id: number){
    this.userService.getUserById(id).subscribe({
      next: (user)=> { this.utenteSelezionato = user.cognome + " " + user.nome },
      error: (e) => { alert(e.error) }
    })
  }

  getUtenteByEmail(email: string) {
    this.userService.getUserByEmail(email).subscribe({
      next: (user) => { this.utenteSelezionato = user.cognome + " " + user.nome },
      error: (e) => { alert(e.error) }
    })
  }

  getPrenotazioniAdmin(): void {
    this.prenotazioneService.getPrenotazioni().subscribe({
      next: (data : Prenotazione[]) => { this.formattaInformazioni(data); },
      error: (e) => { alert(e.error.text) },
      complete: ()=>{ this.datiCaricati = true }
    })
  }
  
  getPrenotazioniByUserEmail(email: string): void {
    this.prenotazioneService.getPrenotazioniUtente(email).subscribe({
      next: (response: Prenotazione[]) => { 
        this.formattaInformazioni(response); 
        this.utenteSelezionato = this.prenotazioniTabella[0]?.utente || "";
      },
      error: (e) => { alert(e.error.text) },
      complete: ()=>{ this.datiCaricati = true }
    })
    this.tableConfig.headers = this.tableConfig.headers?.filter(elem => elem.field !== "utente")
  }

  formattaInformazioni(prenotazioni: Prenotazione[]): void {
    prenotazioni.forEach(elem => {
      let temp = new DtoPrenotazioneTabella(elem);

      temp.dataRichiesta = temp.dataRichiesta ? this.datePipe.transform(temp.dataRichiesta, "dd-MM-yyyy") : "";
      temp.dataInizio = temp.dataInizio ? this.datePipe.transform(temp.dataInizio, "dd-MM-yyyy") : "";
      temp.dataFine = temp.dataFine ? this.datePipe.transform(temp.dataFine, "dd-MM-yyyy") : "";
      temp.dataConferma = temp.dataConferma ? this.datePipe.transform(temp.dataConferma, "dd-MM-yyyy") : "";
      temp.dataRifiuto = temp.dataRifiuto ? this.datePipe.transform(temp.dataRifiuto, "dd-MM-yyyy") : "";

      if(temp.dataInizio !== "" && !this.storageService.getIsAdmin())
        temp.editabile = elem.dataInizio ? this.getDaysDifference(new Date(elem.dataInizio)) : false  
      else 
        temp.editabile = false;
        temp.viewOnly = !temp.editabile 
      this.prenotazioniTabella.push(temp) 
      })
  }

  goBack(): void {
    this.router.navigateByUrl('/homepage')
  }

  getDaysDifference(dataInizio: Date): boolean {
    let currentDate = new Date();
    const diffTime = dataInizio.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 2;
  }

  handleAction(event: { action: string, row: Prenotazione }): void {
    switch(event.action){
      case 'delete':
        this.onDelete(event.row)
        break;
      case 'edit':
        this.router.navigateByUrl(`/dettagli-prenotazione/EDIT/${event.row.id}`)
        break;
      case 'viewDetails':
        this.router.navigateByUrl(`/dettagli-prenotazione/VIEW/${event.row.id}`)
        break;
    }
  }

  onDelete(row: Prenotazione): void {
    if (confirm(`Sei sicuro di voler eliminare la prenotazione con ID ${row.id}?`)) {
      this.prenotazioneService.deletePrenotazione(row.id).subscribe({
        next: (response) => {
          alert(response) 
          window.location.reload();
        },
        error: (error) => { alert(error.error) }
      });
    }
  }
}
