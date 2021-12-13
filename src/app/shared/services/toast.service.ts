import { Injectable } from '@angular/core';
import { IToast } from '@components/toast/i-toast';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private initialData: IToast[] = [];
  private toastSubject: BehaviorSubject<IToast[]> = new BehaviorSubject(this.initialData);

  get toasts(): IToast[]{
    return this.toastSubject.value;
  }

  hideToast(id: number | undefined): void{
    let actual = this.toasts;
    actual =  this.toasts.filter((x) => x.id !== id);
    this.toastSubject.next(actual);
  }

  addToast(toast: IToast): void{
    const id = Date.now();
    this.toastSubject.next([
      ...this.toasts,
      {
        ...toast,
        id
      }
    ]);

    setTimeout(() => {
      this.hideToast(id);
    }, toast.timeOut);
  }
}
