import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { MyActions } from '../my-table/my-table-config';
import { ENCRYPTION_KEY, LOGIN_BUTTON } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CryptoService } from '../../services/crypto/crypto.service';

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
  private cryptoService = inject(CryptoService)
  username: string = "";
  password: string = "";
  loginButton: MyActions = LOGIN_BUTTON;

  ngOnInit(){ 
    this.storageService.clean() 
  }

  onLogin() : void {
    let encryptedPw = this.cryptoService.encryptData(this.password, ENCRYPTION_KEY);
    this.authService.login(this.username,encryptedPw).subscribe({
      next: (token) => {
        if(token){
          this.storageService.setIsLogged(true);
          this.storageService.setToken(token);
          let decodedToken = this.helper.decodeToken(token);
          this.storageService.setEmail(decodedToken.sub);
          this.storageService.setIsAdmin(decodedToken.isAdmin);
          this.router.navigate(['/homepage']);
        }
      },
      error: (e) => {
        alert(e.error.text)
        this.storageService.setIsLogged(false);
        this.storageService.setIsAdmin(false)
      },
    });
  }
}
