import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TOAST_TYPE } from '@components/toast/i-toast';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '@redux/app.actions';
import { AppState } from '@redux/init.reducer';
import { DialogService } from '@services/dialog.service';
import { NotificationService } from '@services/notification.service';
import { IUser } from 'app/main/interfaces/i-user';
import { AppStateWithUser } from 'app/main/store/userStore/reducers';
import { Subscription } from 'rxjs';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-index-provider',
  templateUrl: './index-provider.component.html',
  styleUrls: ['./index-provider.component.scss']
})
export class IndexProviderComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'statusName', 'options'];
  dataSource!: MatTableDataSource<any>;
  providers = [];
  user!: IUser | null;
  subs!: Subscription;
  constructor(private providerService: ProviderService,
              private dialogService: DialogService,
              private store: Store<AppStateWithUser>,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.onGetProviders();

    this.subs = this.store.select('user').subscribe((data) => this.user = data.user);
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }

  async onRestoreProvider(data: any): Promise<void>{
    if(await this.dialogService.onShowConfirmation(
      {
        title: '¿Estás seguro de solicitar la reevaluación?',
        desc: 'El proveedor volverá a un estatus "No calificado"',
        icon : 'alert-circle-outline'
      }).toPromise()){
        this.onReevaluateProvider(data.results[0].id);

      }
  }

  async onReevaluateProvider(resultId: number | string): Promise<void>{
    try{
      this.store.dispatch( isLoading() );
      await this.providerService.onRestoreProvider(resultId).toPromise();
      this.store.dispatch( stopLoading() );
      this.notificationService.onShowNotification({
        title: 'Proveedor restaurado',
        desc: 'El proveedor puede ser evaluado nuevamente.',
        type: TOAST_TYPE.SUCCESS
      });
      this.onGetProviders();
    }catch(error){
      this.notificationService.onShowNotification({
        title: 'Ocurrió un error',
        desc: 'Intente más tarde o contacte a soporte.',
        type: TOAST_TYPE.DANGER
      });
    }
  }

  onGetProviders(): void{
    this.providerService.onGetProviders().subscribe((data) => {
      this.filterData(data);
    });
  }

  filterData(data: any): void{
    this.providers = data.map((x: any) => ({
        ...x,
        statusName: x.status.name
      }));
    this.setData();
  }

  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.providers;
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
