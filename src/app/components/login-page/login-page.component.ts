import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utente } from '../../config';
import { AutenticazioneService } from '../../services/login/autenticazione.service';

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

  onSubmit(username: string , password: string) : void {
    this.authService.login(username, password);
    this.authService.getAuthState().subscribe(result => {
      if(result)
        this.router.navigate(['/homepage']);
      else
        this.authService.getErrorMessage().subscribe(result => console.log(result))
    })
  }
}
