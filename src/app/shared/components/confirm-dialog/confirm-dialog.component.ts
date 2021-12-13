import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string;
    desc: string;
    icon: 'check-circle-outline' | 'close-circle-outline' | 'alert-circle-outline';
  }) { }

  ngOnInit(): void {
  }

}
