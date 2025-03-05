import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private storageService = inject(StorageService)

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.storageService.getToken();
    if(token != null)
      authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + token) })

    return next.handle(authReq);
  }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  ];