import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@redux/init.reducer';
import { removeUser } from 'app/main/store/userStore/actions';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IToken } from '../interfaces/auth';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private dataService: DataService,
              private store: Store<AppState>) { }

  onLogin(data: any): Observable<IToken>{
    return this.http.post<IToken>(`${environment.API_URL}/login`, data).pipe(
      tap((token: IToken) => {
        this.dataService.onSaveCookie(environment.NAME_TOKEN, token.token);
      })
    );
  }

  onLogOut(): Observable<any>{
    return this.http.delete<any>(`${environment.API_URL}/logout`).pipe(
      tap(() => {
        this.dataService.onRemoveAllCookies();
        this.store.dispatch( removeUser() );
      })
    );
  }
}
