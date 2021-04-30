import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit{
  title = 'roleplaymanager-ng-client';

  helper = new JwtHelperService();

  constructor(public router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('jwt-rpmanager') === null) {
      this.router.navigate(['/auth']);
      return;
    }

    const token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;

    if (this.helper.isTokenExpired(token)) {
      this.router.navigate(['/auth']);
    }
  }
}
