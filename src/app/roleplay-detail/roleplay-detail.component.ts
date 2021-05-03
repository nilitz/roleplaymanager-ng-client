import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {JwtClientService} from '../jwt-client.service';

@Component({
  selector: 'app-roleplay-detail',
  templateUrl: './roleplay-detail.component.html',
  styleUrls: ['./roleplay-detail.component.sass']
})
export class RoleplayDetailComponent implements OnInit {
  id: any;
  roleplay: any;
  description: any;
  editedDescription: any;
  editingDescription = false;

  token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;



  descPostRequest: { description: string } = {
    description: '',
  };


  constructor(private route: ActivatedRoute, private service: JwtClientService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      const resp = this.service.getRoleplay(this.token, this.id);

      resp.subscribe(
        data => {
          const parsed = JSON.parse(data);
          this.roleplay = parsed.name;
          this.description = parsed.description;
          this.editedDescription = parsed.description;
        },
        err => {
          console.log(err);
        }
      );
    });
  }


  onCancelClick(): void {
    this.editedDescription = this.description;
    this.editingDescription = false;
  }
  onValidateClick(): void {
    this.description = this.editedDescription;
    this.editingDescription = false;
    this.descPostRequest.description = this.description;
    const resp = this.service.postRoleplayDesc(this.token, this.id, this.descPostRequest);

    resp.subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }




}
