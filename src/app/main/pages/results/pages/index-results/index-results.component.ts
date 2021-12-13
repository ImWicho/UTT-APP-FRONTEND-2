import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TOAST_TYPE } from '@components/toast/i-toast';
import { Store } from '@ngrx/store';
import { isLoading, stopLoading } from '@redux/app.actions';
import { AppState } from '@redux/init.reducer';
import { DialogService } from '@services/dialog.service';
import { NotificationService } from '@services/notification.service';
import { ProviderService } from 'app/main/pages/providers/services/provider.service';
import { ResultService } from '../../services/result.service';

@Component({
  selector: 'app-index-results',
  templateUrl: './index-results.component.html',
  styleUrls: ['./index-results.component.scss']
})
export class IndexResultsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['quizId', 'isAnswered', 'providerName','finalScore', 'options'];
  dataSource!: MatTableDataSource<any>;
  results = [];
  constructor(private resultService: ResultService,
              private store: Store<AppState>,
              private providerService: ProviderService,
              private notificationService: NotificationService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.onGetResults();
  }

  onGetResults(): void{
    this.resultService.onGetResults().subscribe((data) => {
      this.filterData(data);
    });
  }

  filterData(data: any): void{
    this.results = data.map((x: any) => ({
        ...x,
        providerName: x.provider.name
      }));
    this.setData();
  }

  async onRestoreProvider(data: any): Promise<void>{
    if(await this.dialogService.onShowConfirmation(
      {
        title: '¿Estás seguro de solicitar la reevaluación?',
        desc: 'El proveedor volverá a un estatus "No calificado"',
        icon : 'alert-circle-outline'
      }).toPromise()){
        this.onReevaluateProvider(data.id);

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
      this.onGetResults();
    }catch(error){
      this.notificationService.onShowNotification({
        title: 'Ocurrió un error',
        desc: 'Intente más tarde o contacte a soporte.',
        type: TOAST_TYPE.DANGER
      });
    }
  }

  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.results;
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
