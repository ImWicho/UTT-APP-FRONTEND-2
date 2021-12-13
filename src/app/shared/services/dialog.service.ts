import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@components/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  onShowDialog(component: any, conf: { width?: number; height?: number }): Observable<any>{
    return this.dialog.open(component, {
      width: conf?.width ? `${conf.width}px` : '600px',
      height: conf?.height ? `${conf.height}px` : 'auto',
      disableClose : true,
    }).afterClosed();
  }

  onShowDialogData(component: any, data: any ,conf?: { width?: number; height?: number }): Observable<any>{
    return this.dialog.open(component, {
      width: conf?.width ? `${conf.width}px` : '600px',
      height: conf?.height ? `${conf.height}px` : 'auto',
      disableClose : true,
      data
    }).afterClosed();
  }

  onShowConfirmation(
    data: {
      title: string;
      desc: string;
      icon: 'check-circle-outline' | 'close-circle-outline' | 'alert-circle-outline';
    }): Observable<any>{
    return this.dialog.open(ConfirmDialogComponent,{
      width: '500px',
      disableClose : true,
      data
    }).afterClosed();
  }
}
