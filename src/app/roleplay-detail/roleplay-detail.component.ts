import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-roleplay-detail',
  templateUrl: './roleplay-detail.component.html',
  styleUrls: ['./roleplay-detail.component.sass']
})
export class RoleplayDetailComponent implements OnInit {

  roleplay: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roleplay = params['name'];
    });
  }

}
