export class Config{
    navHeaders: NavHeader[] | undefined;
    utenti: Utente[] | undefined
}

export interface NavHeader{
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
    admin: boolean;
    email: string;
    password: string;
}