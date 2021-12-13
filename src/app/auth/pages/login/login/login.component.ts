import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TOAST_TYPE } from '@components/toast/i-toast';
import { EMAIL } from '@constants/regex';
import { NotificationService } from '@services/notification.service';
import { AuthService } from 'app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  hide = true;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private notificationService: NotificationService) { this.onBuildForm(); }

  ngOnInit(): void {
  }

  onBuildForm(): void{
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(EMAIL)]],
      password: [null, [Validators.required]]
    });
  }

  onLogin(): void{
    if(this.form.invalid || this.isLoading){ return; }
    this.isLoading = true;
    this.authService.onLogin(this.form.value)
      .subscribe(() => {
        this.notificationService.onShowNotification({
          title: 'Bienvenido',
          desc: 'Has iniciado sesión correctamente.',
          type: TOAST_TYPE.SUCCESS
        });
        this.router.navigate(['/main']);
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.notificationService.onShowNotification({
          title: 'Credenciales Incorrectas',
          desc: 'Verifica correo y contraseña.',
          type: TOAST_TYPE.DANGER
        });
      });
  }


}
