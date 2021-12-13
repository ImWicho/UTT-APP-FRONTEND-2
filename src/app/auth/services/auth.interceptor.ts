import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dataSvc: DataService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token: string | null = this.dataSvc.onGetCookieStorage(environment.NAME_TOKEN);

    if(token){
      request = this.cloneRequest(request, token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => throwError(this.handleError(error)))
    );
  }

  private cloneRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown>{
    return request.clone({
      setHeaders: {
        Authorization : `Bearer ${token}`
      }
    });
  }

  private handleError(error: HttpErrorResponse): HttpErrorResponse{
    console.warn('Ocurrió un error', error);

    if(error.status === HttpStatusCode.Unauthorized){
      this.dataSvc.onRemoveAllCookies();
      this.router.navigate(['/auth', 'login']);
    }

    return error;
  }
}
