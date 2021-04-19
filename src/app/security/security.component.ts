import { Component } from '@angular/core';
import { JwtClientService } from '../jwt-client.service';
import {Route, Router} from '@angular/router';

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

  constructor(private service: JwtClientService, private router: Router) {}

  public signUp(): void {

    if (
      this.authRequest.username === '' ||
      this.authRequest.password === '' ||
      this.authRequest.passwordConfirmation === '' ||
      this.authRequest.email === ''
    ) {
      this.messageSign = 'Please enter your registration information';
      return;
    }

    const resp = this.service.postSignUp(this.authRequest);
    resp.subscribe(
      response => { this.messageSign = response.status; },
      err => {this.messageSign = JSON.parse(err.error).message;
      });
    resp.subscribe(data => {
      this.token = data;
      localStorage.setItem('jwt-rpmanager', JSON.stringify({ token: this.token }));
      this.router.navigate(['/']);
    });
  }

  public getUser(): void {
    const currentUser = JSON.parse(localStorage.getItem('jwt-rpmanager') as string);
    const token = currentUser.token; // your token
    console.log(token);

    const resp = this.service.getUser(token);
    resp.subscribe(
      response => { this.messageLog = response.status; },
      err => {this.messageLog = JSON.parse(err.error).message;
      });
    resp.subscribe(data => {
      console.log(data);
    });
  }

  public logIn(): void {

    if (
      this.authRequest.username === '' ||
      this.authRequest.password === ''
    ) {
      this.messageLog = 'Please enter your authentication information';
      return;
    }

    const resp = this.service.postLogIn(this.authRequest);
    resp.subscribe(
      response => { this.messageLog = response.status; },
      err => {this.messageLog = JSON.parse(err.error).message;
      });
    resp.subscribe(data => {
      this.token = data;
      localStorage.setItem('jwt-rpmanager', JSON.stringify({ token: this.token }));
      this.router.navigate(['/']);
    });
  }

}
