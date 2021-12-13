import { HttpErrorResponse } from '@angular/common/http';
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
import { ProvidersDialogComponent } from '../../components/providers-dialog/providers-dialog.component';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-index-orders',
  templateUrl: './index-orders.component.html',
  styleUrls: ['./index-orders.component.scss']
})
export class IndexOrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['id', 'areaName', 'cost', 'options'];
  dataSource!: MatTableDataSource<any>;
  orders = [];
  constructor(private orderService: OrderService,
              private dialogService: DialogService,
              private store: Store<AppState>,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.onGetOrders();
  }

  onOpenDialogProvider(data: any): void{
    this.dialogService.onShowDialogData(ProvidersDialogComponent, data, { width: 500 });
  }

  async onOpenConfirm(data: any): Promise<void>{
    if(await this.dialogService.onShowConfirmation({
      title: '¿Estás seguro de aprobar la orden?',
      desc: 'No se podrá devolver',
      icon: 'alert-circle-outline'
    }).toPromise()){
      try{
        const x = {
          orderId: data.id,
          providers: data.providers.map((a: any) => a.id)
        };
        this.onGenerateQuiz(x);
      }catch(error){
        this.notificationService.onShowNotification({
          title: 'Ocurrió un error',
          desc: 'Intente más tarde o contacte a soporte.',
          type: TOAST_TYPE.DANGER
        });
      }
    }
  }

  async onGenerateQuiz(data: any): Promise<void>{
    this.store.dispatch( isLoading() );
    await this.orderService.onGenerateQuiz(data).toPromise();
    this.store.dispatch( stopLoading() );
    this.notificationService.onShowNotification({
      title: 'Orden aprobada',
      desc: 'La orden se aprobó correctamente',
      type: TOAST_TYPE.SUCCESS
    });
    this.onGetOrders();
  }

  onGetOrders(): void{
    this.orderService.onGetOrdersWithOutQuiz().subscribe((data) => {
      this.filterData(data);
    }, (error: HttpErrorResponse) => {
      this.notificationService.onShowNotification({
        title: 'Ocurrió un error',
        desc: 'Intente más tarde o contacte a soporte.',
        type: TOAST_TYPE.DANGER
      });
    });
  }

  filterData(data: any): void{
    this.orders = data.map((x: any) => ({
      ...x,
      areaName : x.area.name,

    }));
    this.setData();
  }

  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.orders;
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
