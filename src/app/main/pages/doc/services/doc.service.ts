import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocService {

  constructor(private http: HttpClient) { }

  onGetDocuments(): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}/api/v1/docs`);
  }

  onSaveDocument(data: any): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/api/v1/docs`, data);
  }

  onUpdateDocument(data: any): Observable<any>{
    return this.http.put<any>(`${environment.API_URL}/api/v1/docs/${data.id}`, data);
  }

  onUpdateDocumentStatus(data: any): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/api/v1/update-doc`, data);
  }
}
