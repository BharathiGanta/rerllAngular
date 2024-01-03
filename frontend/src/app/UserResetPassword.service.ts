import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserResetPasswordService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  checkEmail(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password-check-email`, {
      email: email,
    });
  }

  checkSecurityAnswers(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password-check-answers`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, data);
  }
}