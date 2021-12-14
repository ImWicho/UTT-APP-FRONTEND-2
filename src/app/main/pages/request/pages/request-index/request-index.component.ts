import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { DialogService } from '@services/dialog.service';
import { NotificationService } from '@services/notification.service';
import { IUser } from 'app/main/interfaces/i-user';
import { AppStateWithUser } from 'app/main/store/userStore/reducers';
import { Subscription } from 'rxjs';
import { RequestDialogComponent } from '../../components/request-dialog/request-dialog.component';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-index',
  templateUrl: './request-index.component.html',
  styleUrls: ['./request-index.component.scss']
})
export class RequestIndexComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'statusName', 'options'];
  dataSource!: MatTableDataSource<any>;
  requests = [];
  user!: IUser | null;
  subs!: Subscription;
  constructor(private service: RequestService,
              private dialogService: DialogService,
              private store: Store<AppStateWithUser>,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.onGetDocs();
    this.subs = this.store.select('user').subscribe((data) => this.user = data.user);
  }

  async openDialog(): Promise<void>{
    if(await this.dialogService.onShowDialog(RequestDialogComponent, { width: 500 }).toPromise()){
      console.log(true);
    }
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }

  onGetDocs(): void{
    this.service.onGetRequests().subscribe((data) => {
      this.requests = data;
      this.setData();
    });
  }

  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.requests;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
