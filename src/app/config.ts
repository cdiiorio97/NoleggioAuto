export class Config{
    navHeaders: NavHeader[] | undefined;
}

export interface NavHeader{
    field: string;
    label: string;
    link: string;
    visibile: boolean;
}

export interface Auto {
    id: number;
    targa: string;
    brand: string;
    modello: string;
}

export interface Utente{
    id: number;
    nome: string;
    cognome: string;
    isAdmin: boolean;
    email: string;
    password: string;
}

export interface Prenotazione{
    id: number;
    idUtente: number;
    idAuto: number;
    dataInizio: Date | string;
    dataFine: Date | string;
    dataRichiesta: Date | string;
    dataConferma: Date | string;
    dataCancellazione: Date | string;
    confermata: boolean;
    confermataDa: number;
    cancellataDa: number;
}
