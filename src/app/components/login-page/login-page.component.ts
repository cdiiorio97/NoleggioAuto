import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticazioneService } from '../../services/login/autenticazione.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router, 
    private authService: AutenticazioneService
  ) {}

  ngOnInit(){
    this.authService.logout()
  }

  onSubmit(username: string , password: string) : void {
    this.authService.login(username, password);
    this.authService.setIsLogged();
    this.authService.setIsAdmin();
    if(this.authService.isLogged)
      this.router.navigate(['/homepage']);
  }
}
