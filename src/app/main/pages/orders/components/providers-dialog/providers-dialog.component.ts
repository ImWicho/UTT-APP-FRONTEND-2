import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-providers-dialog',
  templateUrl: './providers-dialog.component.html',
  styleUrls: ['./providers-dialog.component.scss']
})
export class ProvidersDialogComponent implements OnInit {
  providers: any = [];
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit(): void {
    this.providers = this.data;
  }

}
