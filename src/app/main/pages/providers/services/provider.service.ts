import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient) { }

  onGetProviders(): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}/api/v1/providers`);
  }

  onRestoreProvider(resultId: number | string): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/api/v1/results/restoreProvider`, { resultId });
  }
}
