import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtClientService} from '../jwt-client.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StringPostRequest} from '../request';

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

  token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;

  constructor(private route: ActivatedRoute, private service: JwtClientService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
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

  autoGrow(): void {
    const element = document.querySelector('.textarea-resize') as HTMLElement;
    element.style.height = '5px';
    element.style.height = (element.scrollHeight) + 'px';
  }

  onDescEditClick(): void {
    this.editingDescription = !this.editingDescription;
    const element = document.querySelector('.textarea-resize') as HTMLElement;
  }

  onDescCancelClick(): void {
    this.editedDescription = this.description;
    this.editingDescription = false;
  }
  onDescValidateClick(): void {
    this.description = this.editedDescription;
    this.editingDescription = false;

    const request = new StringPostRequest(this.description);

    const resp = this.service.postRoleplayDesc(this.token, this.id, request.stringPostRequest);

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
