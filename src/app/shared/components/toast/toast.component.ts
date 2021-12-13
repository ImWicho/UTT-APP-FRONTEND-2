import { Component, OnInit } from '@angular/core';
import { ToastService } from '@services/toast.service';
import { TOAST_TYPE } from './i-toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  types = TOAST_TYPE;
  constructor(public service: ToastService) { }

  ngOnInit(): void {
  }

}
