import { Component, OnInit } from '@angular/core';
import {JwtClientService} from '../jwt-client.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.sass']
})
export class SecurityComponent implements OnInit {

  authRequest: any = {
    username: 'mario',
    password: 'password'
  };

  authenticated: any;

  constructor(private service: JwtClientService) { }

  ngOnInit(): void {
    this.getAccessToken(this.authRequest);
  }

  public getAccessToken(authRequest: any): void {
    const resp = this.service.authenticate(authRequest);
    resp.subscribe(data => this.authenticated = true);
  }

}
