import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {


  private api = 'http://localhost:9192/api/v1/';

  constructor(private http: HttpClient) { }

  public postLogIn(request: any): Observable<any> {
    return this.http.post(this.api + 'login', request, {responseType: 'text' as 'json'});
  }

  public postSignUp(request: any): Observable<any> {
    return this.http.post(this.api + 'signup', request, {responseType: 'text' as 'json'});
  }

  public getUser(token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<string>(this.api + 'user/me', {headers, responseType: 'text' as 'json' });
  }


  public postRoleplay(token: string, request: any): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.post(this.api + 'roleplay', request, {headers, responseType: 'text' as 'json' });
  }

  public getUserPlayerRoleplay(token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<string>(this.api + 'roleplay/player', {headers, responseType: 'text' as 'json' });
  }


  public getUserGMRoleplay(token: string): Observable<any> {
    console.log(token);
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<string>(this.api + 'roleplay/gm', {headers, responseType: 'text' as 'json' });
  }


}
