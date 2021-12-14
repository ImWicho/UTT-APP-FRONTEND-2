import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TOAST_TYPE } from '@components/toast/i-toast';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '@redux/app.actions';
import { DialogService } from '@services/dialog.service';
import { NotificationService } from '@services/notification.service';
import { IUser } from 'app/main/interfaces/i-user';
import { AppStateWithUser } from 'app/main/store/userStore/reducers';
import { Subscription } from 'rxjs';
import { DocService } from '../../services/doc.service';

@Component({
  selector: 'app-doc-index',
  templateUrl: './doc-index.component.html',
  styleUrls: ['./doc-index.component.scss']
})
export class DocIndexComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'statusName', 'options'];
  dataSource!: MatTableDataSource<any>;
  docs = [];
  user!: IUser | null;
  subs!: Subscription;
  constructor(private service: DocService,
              private dialogService: DialogService,
              private store: Store<AppStateWithUser>,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.onGetDocs();

    // this.subs = this.store.select('user').subscribe((data) => this.user = data.user);
  }

  ngOnDestroy(): void{
    // this.subs.unsubscribe();
  }

  // async onRestoreProvider(data: any): Promise<void>{
  //   if(await this.dialogService.onShowConfirmation(
  //     {
  //       title: '¿Estás seguro de solicitar la reevaluación?',
  //       desc: 'El proveedor volverá a un estatus "No calificado"',
  //       icon : 'alert-circle-outline'
  //     }).toPromise()){
  //       this.onReevaluateProvider(data.results[0].id);

  //     }
  // }

  // async onReevaluateProvider(resultId: number | string): Promise<void>{
  //   try{
  //     this.store.dispatch( isLoading() );
  //     await this.service.onRestoreProvider(resultId).toPromise();
  //     this.store.dispatch( stopLoading() );
  //     this.notificationService.onShowNotification({
  //       title: 'Proveedor restaurado',
  //       desc: 'El proveedor puede ser evaluado nuevamente.',
  //       type: TOAST_TYPE.SUCCESS
  //     });
  //     this.onGetProviders();
  //   }catch(error){
  //     this.notificationService.onShowNotification({
  //       title: 'Ocurrió un error',
  //       desc: 'Intente más tarde o contacte a soporte.',
  //       type: TOAST_TYPE.DANGER
  //     });
  //   }
  // }

  onGetDocs(): void{
    this.service.onGetDocuments().subscribe((data) => {
      this.docs = data;
      this.setData();
    });
  }

  // filterData(data: any): void{
  //   this.providers = data.map((x: any) => ({
  //       ...x,
  //       statusName: x.status.name
  //     }));
  //   this.setData();
  // }

  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.docs;
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
