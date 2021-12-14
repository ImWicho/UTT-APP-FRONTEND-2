import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-dialog',
  templateUrl: './request-dialog.component.html',
  styleUrls: ['./request-dialog.component.scss']
})
export class RequestDialogComponent implements OnInit {
  isLoading = false;
  form!: FormGroup;
  constructor(private fb: FormBuilder) { this.buildForm(); }

  ngOnInit(): void {
  }

  buildForm(): void{
    this.form = this.fb.group({
      test: [null, [Validators.required]]
    });
  }

}
