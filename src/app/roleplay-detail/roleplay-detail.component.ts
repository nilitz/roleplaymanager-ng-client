import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtClientService} from '../jwt-client.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-roleplay-detail',
  templateUrl: './roleplay-detail.component.html',
  styleUrls: ['./roleplay-detail.component.sass']
})
export class RoleplayDetailComponent implements OnInit {
  id: any;

  description: any;
  editedDescription: any;
  editingDescription = false;

  stringPostRequest: { postedString: string } = {
    postedString: '',
  };

  token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;

  constructor(private route: ActivatedRoute, private service: JwtClientService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      const resp = this.service.getRoleplay(this.token, this.id);

      resp.subscribe(
        data => {
          const parsed = JSON.parse(data);
          this.description = parsed.description;
          this.editedDescription = this.description;
        },
        err => {
          this.snackBar.open(err, 'Error during loading', {duration: 4000});
          this.router.navigate(['/']);
        }
      );
    });
  }


  onDescCancelClick(): void {
    this.editedDescription = this.description;
    this.editingDescription = false;
  }
  onDescValidateClick(): void {
    this.description = this.editedDescription;
    this.editingDescription = false;
    this.stringPostRequest.postedString = this.description;
    const resp = this.service.postRoleplayDesc(this.token, this.id, this.stringPostRequest);

    resp.subscribe(
      () => {
        this.snackBar.open('Description edited successfully', 'Close', {duration: 4000});
      },
      err => {
        this.snackBar.open(err, 'Close', {duration: 4000});
      }
    );
  }
}
