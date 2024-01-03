import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VaccineService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVaccinatedDetails(): Observable<any[]> {
    const url = `${this.apiUrl}/vaccinatedDetails`;
    return this.http.get<any[]>(url);
  }
}

