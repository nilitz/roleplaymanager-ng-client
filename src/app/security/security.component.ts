import { Component } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import {Route, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass']
})
export class SecurityComponent {

  authRequest: { passwordConfirmation: string; password: string; email: string; username: string } = {
    username: '',
    password: '',
    passwordConfirmation: '',
    email: ''
  };

  messageSign = '';
  messageLog = '';

  token: any;

  constructor(private service: JwtClientService, private router: Router, private snackBar: MatSnackBar) {}

  public signUp(): void {

    if (
      this.authRequest.username === '' ||
      this.authRequest.password === '' ||
      this.authRequest.passwordConfirmation === '' ||
      this.authRequest.email === ''
    ) {
      this.snackBar.open('Please enter your registration information', 'Close', {duration: 4000});
      return;
    }

    console.log('SIGNUPTEST');
    this.subscribeAndAuth(this.service.postSignUp(this.authRequest));
  }

  public logIn(): void {

    if (
      this.authRequest.username === '' ||
      this.authRequest.password === ''
    ) {
      this.snackBar.open('Please enter your authentication information', 'Close', {duration: 4000});
      return;
    }

    this.subscribeAndAuth(this.service.postLogIn(this.authRequest));
  }

  public subscribeAndAuth(resp: Observable<any>): void {
    resp.subscribe(
      data => {
        this.token = data;
        this.snackBar.open('Authenticated', 'Close', {duration: 4000});
        localStorage.setItem('jwt-rpmanager', JSON.stringify({ token: this.token }));
        this.router.navigate(['/']);
      },
      err => {
        this.snackBar.open(JSON.parse(err.error).message, 'Close', {duration: 4000});
      }
    );
  }

}
