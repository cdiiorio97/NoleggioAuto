import { Prenotazione } from "../config";

export class DtoPrenotazioneTabella{
    id?: number;
    utente?: string;
    auto?: string;
    dataInizio?: string ;
    dataFine?: string ;
    dataRichiesta?: string;
    dataConferma?: string ;
    confermata?: boolean;
    confermataDa?: string;
    rifiutata?: boolean;
    rifiutataDa?: string;
    dataRifiuto?: string ;
    editabile?: boolean;
    viewOnly?: boolean;

    constructor(pren: Prenotazione){
        this.id = pren.id;
        this.utente = pren.utente.cognome + " " + pren.utente.nome
        this.auto = pren.auto.brand +" "+ pren.auto.modello
        this.dataInizio = pren.dataInizio ? new Date(pren.dataInizio).toISOString() : undefined;
        this.dataFine = pren.dataFine ? new Date(pren.dataFine).toISOString() : undefined;
        this.dataRichiesta = pren.dataRichiesta ? new Date(pren.dataRichiesta).toISOString() : undefined;
        if(pren.confermata){
            this.confermata = true
            this.confermataDa = pren.confermataDa?.cognome +" "+ pren.confermataDa?.nome
            this.dataConferma = pren.dataConferma ? new Date(pren.dataConferma).toISOString() : undefined;
        }
        if(pren.rifiutata){
            this.rifiutata = true
            this.rifiutataDa = pren.rifiutataDa?.cognome +" "+ pren.rifiutataDa?.nome
            this.dataRifiuto = pren.dataRifiuto ? new Date(pren.dataRifiuto).toISOString() : undefined;
        }
    }
}