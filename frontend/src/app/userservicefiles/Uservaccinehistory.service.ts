import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserVaccineHistoryService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUserVaccinationHistory(userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getUserVaccinationHistory/${userEmail}`);
  }

}