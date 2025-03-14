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
    editabile?: boolean;
    viewOnly?: boolean;
}

export interface Utente{
    id: number;
    nome: string;
    cognome: string;
    isAdmin: boolean;
    email: string;
    password: string;
    editabile?: boolean;
}

export interface Prenotazione{
    id: number;
    utente: Utente;
    auto: Auto;
    dataInizio?: Date | string;
    dataFine?: Date | string;
    dataRichiesta: Date | string;
    dataConferma?: Date | string;
    confermata?: boolean;
    confermataDa?: Utente;
    rifiutata?: boolean;
    rifiutataDa?: Utente;
    dataRifiuto?: Date | string;
    editabile?: boolean;
    viewOnly?: boolean;
}
