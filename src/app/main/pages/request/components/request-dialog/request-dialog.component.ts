import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TOAST_TYPE } from '@components/toast/i-toast';
import { NotificationService } from '@services/notification.service';
import { DocService } from 'app/main/pages/doc/services/doc.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss']
})
export class RequestDialogComponent implements OnInit {
  isLoading = false;
  form!: FormGroup;
  documents: any = [];
  constructor(private fb: FormBuilder,
              private docService: DocService,
              private service: RequestService,
              private notificationService: NotificationService,
              private dialog: MatDialogRef<RequestDialogComponent>) { this.buildForm(); }

  ngOnInit(): void {
    this.onGetDocs();
  }

  sendData(): void{
    if(this.form.invalid){ return; }
    this.isLoading = true;
    const data = {
      ...this.form.value,
    };
      this.service.onSaveRequest(data).subscribe((res) => {
        this.notificationService.onShowNotification({
          title: 'Solicitud creada',
          desc: 'La solicitud se ha creado correctamente.',
          type: TOAST_TYPE.SUCCESS
        });
        this.dialog.close(true);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.notificationService.onShowNotification({
          title: 'Ocurrió un error',
          desc: 'Intente más tarde o contacte a soporte.',
          type: TOAST_TYPE.DANGER
        });
      });
  }

  buildForm(): void{
    this.form = this.fb.group({
      documentoId: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      version: [null, [Validators.required]],
      puntoCambio: [null, [Validators.required]],
      descripcionActual: [null, [Validators.required]],
      descripcionCambio: [null, [Validators.required]],
    });
  }

  onGetDocs(): void{
    this.docService.onGetDocuments().subscribe((data) => {
      this.documents = data;
    });
  }

}
