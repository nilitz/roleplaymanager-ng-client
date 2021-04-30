import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticated-layout',
  templateUrl: './authenticated-layout.component.html',
  styleUrls: ['./authenticated-layout.component.sass']
})
export class AuthenticatedLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngOnLoad(): void {
    console.log('test');
  }
}
