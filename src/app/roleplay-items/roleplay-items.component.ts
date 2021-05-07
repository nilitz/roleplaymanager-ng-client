import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtClientService} from '../jwt-client.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

export interface ItemData {
  id: number;
  name: string;
  description: string;
  itemTypes: any;
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
  id: any;
  items: any;

  token = JSON.parse(localStorage.getItem('jwt-rpmanager') as string).token;

  constructor(private route: ActivatedRoute, private service: JwtClientService, private snackBar: MatSnackBar, private router: Router) {

    this.route.params.subscribe(params => {
      this.id = params.id;
      const resp = this.service.getItem(this.token, this.id);

      /*
      for (let i = 0; i < 30; i++) {
        const request = new TwoStringPostRequest('Item : ' + i, 'Une description');
        const a = this.service.postItem(this.token, this.id, request.twoStringPostRequest);
        a.subscribe();
      }
      */


      resp.subscribe(
        data => {
          this.items = JSON.parse(data);
          this.dataSource = new MatTableDataSource<ItemData>(JSON.parse(data));

          console.log(this.dataSource);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        err => {
          this.snackBar.open(err, 'Error during loading', {duration: 4000});
          this.router.navigate(['/']).then(() => {});
        }
      );
    });

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
}
