import { Utente } from "../config";

export class DtoUtenteModificato{
    id?: number;
    nome?: string;
    cognome?: string;
    email?: string;
    oldPassword?: string;
    newPassword?: string;
    isAdmin?: boolean;

    constructor(u: Utente){
        this.id = u.id;
        this.nome = u.nome;
        this.cognome = u.cognome;
        this.email = u.email;
        this.isAdmin = u.isAdmin
    }
}