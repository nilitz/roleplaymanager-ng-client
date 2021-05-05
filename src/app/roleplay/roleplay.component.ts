import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtClientService} from '../jwt-client.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-roleplay',
  templateUrl: './roleplay.component.html',
  styleUrls: ['./roleplay.component.sass']
})
export class RoleplayComponent implements OnInit {

  id: any;
  name: any;
  editedName: any;
  editingName = false;
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
          this.name = parsed.name;
          this.editedName = this.name;
        },
        err => {
          this.snackBar.open(err, 'Error during loading', {duration: 4000});
          this.router.navigate(['/']);
        }
      );
    });
  }

  onNameCancelClick(): void {
    this.editedName = this.name;
    this.editingName = false;
  }
  onNameValidateClick(): void {
    this.name = this.editedName;
    this.editingName = false;
    this.stringPostRequest.postedString = this.name;

    const resp = this.service.postRoleplayName(this.token, this.id, this.stringPostRequest);

    resp.subscribe(
      () => {
        this.snackBar.open('Name edited successfully', 'Close', {duration: 4000});
      },
      err => {

        this.snackBar.open(err, 'Close', {duration: 4000});
      }
    );
  }
}
