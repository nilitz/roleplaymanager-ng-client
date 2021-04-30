import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {JwtClientService} from './jwt-client.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class LoginRequiredInterceptor implements HttpInterceptor {

  helper = new JwtHelperService();

  constructor(private router: Router, private service: JwtClientService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (localStorage.getItem('jwt-rpmanager') === null) {
      this.router.navigate(['/auth']);
      return next.handle(request);
    }

    const token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;

    if (this.helper.isTokenExpired(token)) {
      this.router.navigate(['/auth']);
    }

    return next.handle(request);
  }
}
