import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { MyActions } from '../my-table/my-table-config';
import { LOGIN_BUTTON } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  private router = inject(Router)
  private authService = inject(AutenticazioneService)
  private storageService = inject(StorageService)
  private helper = new JwtHelperService();
  username: string = "";
  password: string = "";
  loginButton: MyActions = LOGIN_BUTTON;

  ngOnInit(){
    this.authService.logout()
  }

  onLogin() : void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if(response){
          this.storageService.setIsLogged(true);
          this.storageService.setToken(response.token);
          let decodedToken = this.helper.decodeToken(response.token);
          this.storageService.setEmail(decodedToken.sub);
          this.storageService.setIsAdmin(decodedToken.isAdmin);
          this.router.navigate(['/homepage']);
        }
      },
      error: (e) => {
        alert(e.error.text)
        sessionStorage.setItem("loginErrorMessage", e.error.text)
        this.storageService.setIsLogged(false);
        this.storageService.setIsAdmin(false)
      },
    });
  }
}
