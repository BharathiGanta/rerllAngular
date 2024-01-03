import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyMembersBookingService {
  private apiUrl = 'http://localhost:3000/family-members';
  private vaccineUrl = 'http://localhost:3000/vaccine-posted';

  constructor(private http: HttpClient) { }

  bookSlot(data: any[]): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  getVaccines(): Observable<any[]> {
    return this.http.get<any[]>(this.vaccineUrl);
  }
}