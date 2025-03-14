import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticazioneService } from '../../services/login/autenticazione.service';
import { MyActions } from '../my-table/my-table-config';
import { /* ENCRYPTION_KEY,*/ LOGIN_BUTTON } from '../../costanti';
import { StorageService } from '../../services/storage/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { CryptoService } from '../../services/crypto/crypto.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  @Output() loginSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  private router = inject(Router)
  private authService = inject(AutenticazioneService)
  private storageService = inject(StorageService)
  private helper = new JwtHelperService();
  //private cryptoService = inject(CryptoService)
  username: string = "";
  password: string = "";
  loginButton: MyActions = LOGIN_BUTTON;

  onLogin() : void {
    //let encryptedPw = this.cryptoService.encryptData(this.password, ENCRYPTION_KEY);
    //this.authService.login(this.username,encryptedPw).subscribe({
    this.authService.login(this.username,this.password).subscribe({
      next: (token) => {
        if(token){
          this.storageService.setToken(token);
          let decodedToken = this.helper.decodeToken(token);
          this.storageService.setEmail(decodedToken.sub);
          this.storageService.setIsAdmin(decodedToken.isAdmin);

          this.loginSuccess.emit(decodedToken.isAdmin);

          this.storageService.setIsLogged(true);
          this.router.navigateByUrl('/homepage');
        }
      },
      error: (e) => {
        alert(e.error)
        this.storageService.clean();
      },
    });
  }
}
