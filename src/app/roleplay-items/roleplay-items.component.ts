import {AfterViewInit, Component, Inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtClientService} from '../jwt-client.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {StringPostRequest, TwoStringPostRequest} from '../request';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateRoleplayDialogComponent} from '../nav/nav.component';

interface ItemTypes {
  id: number;
  name: string;
}


export interface ItemData {
  id: number;
  name: string;
  description: string;
  itemType: ItemTypes;
}

@Component({
  selector: 'app-roleplay-items',
  templateUrl: './roleplay-items.component.html',
  styleUrls: ['./roleplay-items.component.sass']
})
export class RoleplayItemsComponent implements AfterViewInit {


  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['id', 'name', 'description'];
  // @ts-ignore
  dataSource: MatTableDataSource<ItemData>;
  itemTypes: any;
  id: any;
  items: any;
  newItemType = '';

  token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;

  constructor(private route: ActivatedRoute, private service: JwtClientService, private snackBar: MatSnackBar, private router: Router, public dialog: MatDialog) {

    this.route.params.subscribe(params => {
      this.id = params.id;
      const resp1 = this.service.getItem(this.token, this.id);
  /*
      for (let i = 0; i < 30; i++) {
        const request = new TwoStringPostRequest('Item n°' + i, 'Une description');
        const a = this.service.postItem(this.token, this.id, request.twoStringPostRequest);
        a.subscribe();
      }
  */
      resp1.subscribe(
        data => {
          this.items = JSON.parse(data);
          this.dataSource = new MatTableDataSource<ItemData>(JSON.parse(data));

          console.log(this.dataSource);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        err => {
          this.snackBar.open(err, 'Error during loading items', {duration: 4000});
          this.router.navigate(['/']).then(() => {});
        }
      );
    });

    const resp2 = this.service.getItemType(this.token, this.id);

    resp2.subscribe(
      data => {
        this.itemTypes = JSON.parse(data);
        console.log(this.itemTypes);

      },
      err => {
        this.snackBar.open(err, 'Error during loading item types', {duration: 4000});
        this.router.navigate(['/']).then(() => {});
      }
    );
  }

  ngAfterViewInit(): void {

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  removeItemType(itemType: any): void {
    console.log('remove ' + itemType.id);
  }

  addItemType(): void {
    const request =  new StringPostRequest(this.newItemType);
    const resp2 = this.service.postItemType(this.token, this.id, request.stringPostRequest);

    resp2.subscribe(
      data => {
        console.log(data);
        this.itemTypes.push(JSON.parse(data));
        console.log(this.itemTypes);
      },
      err => {
        this.snackBar.open(err, 'Error during pushing item type', {duration: 4000});
        this.router.navigate(['/']).then(() => {});
      }
    );

  }

  // Dialogs

  openDialog(): void {
    const item: ItemData = {id: 0, name: '', description: '', itemType: {id: 1, name: ''}};
    const dialogRef = this.dialog.open(CreateItemDialogComponent, {
      width: '250px',
      data: {item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

export interface CreateItemDialogData {
  item: ItemData;
}

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: 'dialogs/create-item-dialog.html',
})

export class CreateItemDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateItemDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
