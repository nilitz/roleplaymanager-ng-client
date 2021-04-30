import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {JwtClientService} from '../jwt-client.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  constructor(public router: Router, private service: JwtClientService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  roleplayName = '';

  username = '';
  GMRoleplays: any;
  PlayingRoleplays: any;




  ngOnInit(): void {
    this.getUsername();
    this.getGMRoleplay();
  }

  logOut(): void {
    this.router.navigate(['/auth']);
    localStorage.removeItem('jwt-rpmanager');
  }

  getUsername(): void {
    const token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;
    this.username = 'Not found';

    if (token == null) {
      this.router.navigate(['/auth']);
    }

    const resp = this.service.getUser(token);

    resp.subscribe(data => {
      this.username = JSON.parse(data).username;
    });
  }

  getGMRoleplay(): void {
    const token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;

    const resp = this.service.getUserGMRoleplay(token);

    resp.subscribe(data => {
      this.GMRoleplays = JSON.parse(data);
    });
  }

  getPlayingRoleplay(): void {
    const token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;

    const resp = this.service.getUserPlayerRoleplay(token);

    resp.subscribe(data => {
      this.PlayingRoleplays = JSON.parse(data);
    });
  }

  // Dialogs

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateRoleplayDialogComponent, {
      width: '250px',
      data: {name: this.roleplayName}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.postRoleplay(result);
    });
  }

  public postRoleplay(roleplayName: string): void {

    const postRoleplayRequest: { name: string } = {
      name: roleplayName
    };

    const token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;

    if (
      postRoleplayRequest.name === '' || postRoleplayRequest.name.length > 25
    ) {
      this.snackBar.open('The name must be between 1 & 24 characters', 'Close', {duration: 4000});
      return;
    }

    const resp = this.service.postRoleplay(token, postRoleplayRequest);

    resp.subscribe(
      data => {
        this.snackBar.open(postRoleplayRequest.name + ' Created', 'Close', {duration: 4000});
        this.router.navigate(['/roleplay/', postRoleplayRequest.name]);
        this.getGMRoleplay();
      },
      err => {
        this.snackBar.open(JSON.parse(err.error).message, 'Close', {duration: 4000});
      }
    );
  }
}

// Create Roleplay Dialog

export interface CreateRoleplayDialogData {
  roleplayName: string;
}

@Component({
  selector: 'app-create-roleplay-dialog',
  templateUrl: 'dialogs/create-roleplay-dialog.html',
})

export class CreateRoleplayDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateRoleplayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateRoleplayDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

/*

 */
