import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  onGetRequests(): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}/api/v1/requests`);
  }
}
