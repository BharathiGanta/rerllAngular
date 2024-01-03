import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getSlots(): Observable<any> {
    return this.http.get(`${this.baseUrl}/book-slot`);
  }

  getFamilySlots(): Observable<any> {
    return this.http.get(`${this.baseUrl}/family-members`);
  }

  rescheduleSlot(slotId: string, newDate: string, newTime: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/reschedule-slot/${slotId}`, { newDate, newTime });
  }

  deleteSlot(slotId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-slot/${slotId}`);
  }

  rescheduleFamilySlot(familySlotId: string, newDate: string, newTime: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/reschedule-family-slot/${familySlotId}`, { newDate, newTime });
  }

  deleteFamilySlot(familySlotId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete-family-slot/${familySlotId}`);
  }
 
  completeSlot(slotId: string): Observable<any> {
    const url = `${this.baseUrl}/completeSlot/${slotId}`;
    return this.http.post(url, {});
  }

  completeFamilySlot(familySlotId: string): Observable<any> {
    const url = `${this.baseUrl}/completeFamilySlot/${familySlotId}`;
    return this.http.post(url, {});
  }
}