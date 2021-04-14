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

  response: any;

  constructor(private service: JwtClientService) { }

  ngOnInit(): void {
    this.getAccessToken(this.authRequest);
  }

  public getAccessToken(authRequest: any) {
    const resp = this.service.generateToken(authRequest);
    resp.subscribe(data => this.accessApi(data.toString()));

  }

  public accessApi(token: string) {
    console.log(token);
    const resp = this.service.welcome(token);
    resp.subscribe(data => this.response = data);
  }

}
