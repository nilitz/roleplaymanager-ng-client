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

  token: any;

  constructor(private service: JwtClientService) {}

  public getRegisterToken(): void {
    const resp = this.service.signIn(this.authRequest);
    resp.subscribe(data => {
      this.token = data;
      localStorage.setItem('jwt-roleplaymanager', JSON.stringify({ token: this.token}));
    });
  }

  public getUser(): void {
    const currentUser = JSON.parse(<string> localStorage.getItem('jwt-roleplaymanager'));
    const token = currentUser.token; // your token
    console.log(token);

    const resp = this.service.getUser(token);
    resp.subscribe(data => {
      console.log(data)
    });
  }

  public getAccessToken(): void {
    const resp = this.service.login(this.authRequest);
    resp.subscribe(data => {
      this.token = data;
      localStorage.setItem('currentUser', JSON.stringify({ token: this.token, name: 'roleplaymanagertoken' }));
    });
  }

}
