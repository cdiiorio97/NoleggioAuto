import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticazioneService } from '../../services/login/autenticazione.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  username: string = "";
  password: string = "";
  private router = inject(Router)
  private authService = inject(AutenticazioneService)

  ngOnInit(){
    this.authService.logout()
  }

  onLogin() : void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if(response){
          this.authService.setIsLogged("true");
          this.authService.setIsAdmin(response.isAdmin ? "true" : "false");
          this.authService.setUtenteLoggato(response);
          this.router.navigate(['/homepage']);
        }
      },
      error: (e) => {
        alert(e.error.text)
        sessionStorage.setItem("loginErrorMessage", e.error.text)
        this.authService.setIsLogged("false");
        this.authService.setIsAdmin("false")
      },
    });
  }
}
