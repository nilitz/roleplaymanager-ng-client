import { Component, OnInit } from '@angular/core';
import {JwtClientService} from '../jwt-client.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass']
})
export class SecurityComponent implements OnInit {

  authRequest: any = {
    username: 'hugo',
    password: 'password'
  };

  authenticated: any;

  constructor(private service: JwtClientService) { }

  ngOnInit(): void {
    this.getAccessToken(this.authRequest);
  }

  public getAccessToken(authRequest: any) {
    const resp = this.service.generateToken(authRequest);
    resp.subscribe(data => this.checkAuthentication(data.toString()));

  }

  public checkAuthentication(token: string) {
    const resp = this.service.isAuthenticated(token);
    resp.subscribe(data => this.authenticated = data);
  }
}
