import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TOAST_TYPE } from '@components/toast/i-toast';
import { NotificationService } from '@services/notification.service';
import { DocService } from '../../services/doc.service';

@Component({
  selector: 'app-doc-dialog',
  templateUrl: './doc-dialog.component.html',
  styleUrls: ['./doc-dialog.component.scss']
})
export class DocDialogComponent implements OnInit {
  isLoading = false;
  form!: FormGroup;
  constructor(private fb: FormBuilder,
              private service: DocService,
              private dialog: MatDialogRef<DocDialogComponent>,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data: any) { this.buildForm(); }

  ngOnInit(): void {

    if(this.data){
      console.log(this.data);

      this.form.patchValue(
        {
          ...this.data,
          documentosRelacionados : this.data.documentos_relacionados,
          tipoResguardo : this.data.tipo_resguardo,
          disposicionFinal : this.data.disposicion_final,
        }
        );

    }
  }

  sendData(): void{
    if(this.form.invalid){ return; }
    this.isLoading = true;
    const data = {
      ...this.form.value,
      conservacion : new DatePipe('en').transform(this.form.get('conservacion')?.value, 'YYYY-MM-dd')
    };

    if(!this.data){
      this.service.onSaveDocument(data).subscribe((res) => {
        this.notificationService.onShowNotification({
          title: 'Documento creado',
          desc: 'El documento se ha creado correctamente.',
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
    }else{
      this.service.onUpdateDocument({ ...data, id: this.data.id }).subscribe((res) => {
        this.notificationService.onShowNotification({
          title: 'Documento actualizado',
          desc: 'El documento se ha actualizado correctamente.',
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
  }

  buildForm(): void{
    this.form = this.fb.group({
      nombre: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      version: [null, [Validators.required]],
      responsable: [null, [Validators.required]],
      areas: [null, [Validators.required]],
      documentosRelacionados: [null, [Validators.required]],
      sustituye: [null, [Validators.required]],
      codigo: [null, [Validators.required]],
      conservacion: [null, [Validators.required]],
      tipoResguardo: [null, [Validators.required]],
      disposicionFinal: [null, [Validators.required]],
    });
  }

}
