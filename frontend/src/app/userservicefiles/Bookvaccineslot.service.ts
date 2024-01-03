import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookVaccineSlotService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAvailableVaccines(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vaccine-posted`);
  }

  bookSlot(slotData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/book-slot`, slotData);
  }
}