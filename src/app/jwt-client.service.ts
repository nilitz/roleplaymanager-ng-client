import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http: HttpClient) { }

  public postLogIn(request: any): Observable<any> {
    return this.http.post('http://localhost:9192/api/v1/login', request, {responseType: 'text' as 'json'});
  }

  public postSignUp(request: any): Observable<any> {
    return this.http.post('http://localhost:9192/api/v1/signup', request, {responseType: 'text' as 'json'});
  }

  public getUser(token: string): Observable<any> {
    const tokenStr = 'Bearer ' + token;
    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.http.get<string>('http://localhost:9192/api/v1/user/me', {headers, responseType: 'text' as 'json' });
  }


}
