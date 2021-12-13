import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  onGetOrdersWithOutQuiz(): Observable<any>{
    return this.http.get<any>(`${environment.API_URL}/api/v1/orders/without/quiz`);
  }

  onGenerateQuiz(data: { orderId: number; providers: number[] }): Observable<any>{
    return this.http.post<any>(`${environment.API_URL}/api/v1/quizzes`, data);
  }
}
