import { Component } from '@angular/core';
import {JwtClientService} from '../jwt-client.service';

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

  message = '';

  token: any;

  constructor(private service: JwtClientService) {}

  public signUp(): void {
    const resp = this.service.postSignUp(this.authRequest);
    resp.subscribe(
      response => { this.message = response.status; },
      err => {this.message = JSON.parse(err.error).message;
      });
    resp.subscribe(data => {
      this.token = data;
      localStorage.setItem('jwt-roleplaymanager', JSON.stringify({ token: this.token}));
    });
  }

  public getUser(): void {
    const currentUser = JSON.parse(localStorage.getItem('jwt-roleplaymanager') as string);
    const token = currentUser.token; // your token
    console.log(token);

    const resp = this.service.getUser(token);
    resp.subscribe(
      response => { this.message = response.status; },
      err => {this.message = JSON.parse(err.error).message;
      });
    resp.subscribe(data => {
      console.log(data);
    });
  }

  public logIn(): void {
    const resp = this.service.postLogIn(this.authRequest);
    resp.subscribe(
      response => { this.message = response.status; },
      err => {this.message = JSON.parse(err.error).message;
      });
    resp.subscribe(data => {
      this.token = data;
      localStorage.setItem('currentUser', JSON.stringify({ token: this.token, name: 'roleplaymanagertoken' }));
    });
  }

}
