import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from '../config';
import { AutenticazioneService } from '../autenticazione.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AutenticazioneService) {}

  ngOnInit(){
    this.authService.logout()
  }

  onSubmit(): void {
    let user = this.utentiRegistrati.find(utente => utente.nome.toLowerCase() === this.username.toLowerCase());
    if (user !== null && user?.password === this.password) {
      this.authService.login(user.admin);
      this.router.navigate(['/homepage']);
    } else if (user === null)
      alert("Utente non registrato")
      else 
      alert('Nome utente o password non validi');
  }

  utentiRegistrati: Utente[] = [
    {"id":1,"nome":"Admin","cognome":"Esche","email":"kesche0@dailymotion.com","password":"admin","admin":true},
    {"id":2,"nome":"User","cognome":"Thickett","email":"sthickett1@over-blog.com","password":"user","admin":false},
    {"id":3,"nome":"Hildegaard","cognome":"Oluwatoyin","email":"holuwatoyin2@economist.com","password":"fD2\"kFTaq/Q/Jj","admin":true},
    {"id":4,"nome":"Shaina","cognome":"Lacheze","email":"slacheze3@php.net","password":"mI4/?K,<'18PCd","admin":true},
    {"id":5,"nome":"Harlie","cognome":"Gladbach","email":"hgladbach4@google.pl","password":"tN6=1<vu1@","admin":false},
    {"id":6,"nome":"Levi","cognome":"Christmas","email":"lchristmas5@comcast.net","password":"zO5#,>qZB}k3YIuT","admin":false},
    {"id":7,"nome":"Tab","cognome":"Gladebeck","email":"tgladebeck6@elpais.com","password":"uG8\"v4'O{3Qu2r9C","admin":false},
    {"id":8,"nome":"Fulvia","cognome":"Hurlston","email":"fhurlston7@howstuffworks.com","password":"zO2\"ZM8UajRdU","admin":true},
    {"id":9,"nome":"Clarence","cognome":"Conybear","email":"cconybear8@statcounter.com","password":"kP2)Lvt`B","admin":true},
    {"id":10,"nome":"Celestyna","cognome":"McGinnell","email":"cmcginnell9@nymag.com","password":"eJ9?TFqSIOc$s","admin":false}
  ]
}
