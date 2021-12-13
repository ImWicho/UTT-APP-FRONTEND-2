import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TOAST_TYPE } from '@components/toast/i-toast';
import { Observable } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snack: MatSnackBar, private dialog: MatDialog, private toastService: ToastService) { }

  openSnackBar(msg: string, time: number): Observable<void>{
    return this.snack.open(msg, undefined, { duration: time}).afterOpened();
  }

  onShowNotification(data: { title: string; desc: string; type: TOAST_TYPE }): void{
    this.toastService.addToast({
      title: data.title,
      timeOut: 5000,
      type: data.type,
      description: data.desc,
      useDefaultImage: false,
      resource: 'assets/img/pet.png'
    });
  }
}
