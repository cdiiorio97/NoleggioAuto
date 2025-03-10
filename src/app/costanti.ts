import { MyActions } from "./components/my-table/my-table-config"
import { Auto, Prenotazione, Utente } from "./config"

export const BASE_URL = "http://localhost:8080"
//export const ENCRYPTION_KEY = "12345678901234567890123456789012"

export const UTENTE_VUOTO: Utente = {
    id: 0,
    nome: "",
    cognome: "",
    isAdmin: false,
    email: "",
    password: ""
}
export const AUTO_VUOTA: Auto = {
    id: 0,
    brand: '',
    modello: '',
    targa: ''
  }

export const  PRENOTAZIONE_VUOTA: Prenotazione = {
    id: 0,
    utente: UTENTE_VUOTO,
    auto: AUTO_VUOTA,
    dataInizio: undefined,
    dataFine: undefined,
    dataRichiesta: new Date(),
    dataConferma: undefined,
    confermata: undefined,
    confermataDa: undefined,
    rifiutata: undefined,
    rifiutataDa: undefined,
    dataRifiuto: undefined
  }

export const PRENOTAZIONI_BUTTON: MyActions = {
    label: "Prenotazioni",
    field: "prenotazioni",
    icon: "view_list",
    iconPosition: "left",
    css: {
    "display": "flex",
    "flex-direction": "row",
    "margin-top": "5px", 
    "height": "30px", 
    "width": "fit-content",
    "padding": "10px",
    "margin-right": "5px", 
    "border-radius": "10px",
    "background-color": "grey",
    "color": "white",
    "align-items":"center"
    }
}

export const EDIT_BUTTON: MyActions = { 
    field: "edit",
    icon: "edit",
    iconPosition: "left",
    css: {
    "margin-top": "5px", 
    "height": "30px", 
    "margin-right": "5px", 
    "border-radius": "10px",
    "border-color": "lightblue", 
    "background-color": "lightblue"
    } 
}

export const DELETE_BUTTON: MyActions = {  
    field: "delete",
    icon:"delete",
    iconPosition:"right",
    css: {
        "display": "flex",
        "flex-direction": "row",
        "margin-top": "5px",
        "height": "30px", 
        "width": "fit-content",
        "padding": "10px",
        "background-color": "red", 
        "border-radius": "10px",
        "align-items":"center"
    } 
}

export const ADD_BUTTON: MyActions = { 
    label: "Aggiungi",
    field: "add",
    icon: "add",
    iconPosition: "right",
    css: {
        "display": "flex",
        "flex-direction": "row",
        "margin-top": "0", 
        "height": "30px", 
        "width": "fit-content",
        "padding": "10px",
        "border-radius": "10px",
        "border": "none", 
        "background-color": "#2f8131",
        "color": "white",
        "font-weight": "bold",
        "align-items":"center"
    } 
}

export const LOGOUT_BUTTON: MyActions =    {
    label: "LOGOUT",
    field: "logout",
    icon: "logout",
    iconPosition: "left",
    css: {
        "display": "flex",
        "flex-direction": "row",
        "margin-top": "5px", 
        "height": "30px", 
        "width": "fit-content",
        "padding": "10px",
        "margin-right": "5px", 
        "border-radius": "10px",
        "background-color": "grey",
        "color": "white",
        "align-items":"center"
    }
}

export const BACK_BUTTON: MyActions = {
    label: "GO BACK",
    field: "goBack",
    icon: "arrow_back",
    iconPosition: "left",
    css: {
        "display": "flex",
        "flex-direction": "row",
        "gap": "10px",
        "margin-top": "5px", 
        "height": "30px", 
        "width": "fit-content",
        "padding": "10px",
        "margin-right": "5px", 
        "border-radius": "10px",
        "background-color": "grey",
        "color": "white",
        "align-items":"center"
    }
}

export const ACCEPT_BUTTON: MyActions = { 
    field: "accetta",
    icon: "check",
    iconPosition: "left",
    css: {
        "margin-top": "5px", 
        "height": "32px", 
        "width": "50px",
        "margin-right": "5px", 
        "border-radius": "10px",
        "border": "none" ,
        "background-color": "green"
    } 
}

export const REFUSE_BUTTON: MyActions = {  
    field: "rifiuta",
    icon:"do_not_disturb_on",
    iconPosition:"right",
    css: {
        "display": "flex",
        "flex-direction": "row",
        "margin-top": "5px",
        "height": "32px", 
        "width": "50px",
        "padding": "10px",
        "background-color": "red", 
        "border-radius": "10px",
        "border": "none",
        "align-items":"center"
    } 
}

export const VISIBILITY_BUTTON: MyActions = { 
    field: "visibility",
    icon: "visibility",
    iconPosition: "left",
    css: { 
    "height": "35px", 
    "margin-right": "5px", 
    "border-radius": "3px",
    "border": "none",
    "background-color": "lightgrey"
    } 
}

export const VISIBILITY_OFF_BUTTON: MyActions = { 
    field: "visibility_off",
    icon: "visibility_off",
    iconPosition: "left",
    css: { 
    "height": "35px", 
    "margin-right": "5px", 
    "border-radius": "3px",
    "border": "none",
    "background-color": "lightgrey"
    } 
}

export const SAVE_BUTTON: MyActions = {
    label: "SALVA", 
    field: "save",
    css: { 
        "margin-left": "10px",
        "width": "100px",
        "height": "30px",
        "border-radius": "10px",
        "background-color": "#2f8131",
        "color": "white",
        "font-weight": "700",
        "font-size": "16px",
        "border": "none"
    } 
}

export const PAGINA_PRECEDENTE_BUTTON: MyActions = {
    label: "Precedente", 
    field: "pag_precedente",
    css: { 
        "background-color": "#150d83",
        "color": "white",
        "border": "none",
        "padding": "10px 15px",
        "margin": "0 2px",
        "border-radius": "20px",
        "cursor": "pointer",
        "transition": "background-color 0.3s"
    } 
}

export const PAGINA_SUCCESSIVA_BUTTON: MyActions = {
    label: "Successiva", 
    field: "pag_successiva",
    css: { 
        "background-color": "#150d83",
        "color": "white",
        "border": "none",
        "padding": "10px 15px",
        "margin": "0 2px",
        "border-radius": "20px",
        "cursor": "pointer",
        "transition": "background-color 0.3s"
    } 
}

export const NUM_PAGINA_BUTTON: MyActions = {
    field: "num_pagina",
    iconPosition: "left",
    css: { 
        "background-color": "#150d83",
        "color": "white",
        "border": "none",
        "padding": "10px 15px",
        "margin": "0 2px",
        "border-radius": "20px",
        "cursor": "pointer",
        "transition": "background-color 0.3s"
    } 
}

export const LOGIN_BUTTON: MyActions = {
    label: "LOGIN",
    field: "login",
    css: {
        "width": "100%",
        "padding": "10px",
        "border": "none",
        "border-radius": "3px",
        "background-color": "#007bff",
        "color": "white",
        "font-size": "16px",
        "cursor": "pointer",
        "transition": "background-color 0.3s"
    }
}

export const VIEW_DETAILS_BUTTON: MyActions = { 
    field: "viewDetails",
    icon: "visibility",
    iconPosition: "left",
    css: {
    "margin-top": "5px", 
    "height": "30px", 
    "margin-right": "5px", 
    "border-radius": "10px",
    "border-color": "lightblue", 
    "background-color": "lightblue"
    } 
}