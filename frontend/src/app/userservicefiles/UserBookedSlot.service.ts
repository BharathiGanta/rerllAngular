import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBookedSlotService {
  private apiUrl = 'http://localhost:3000/booked-slot';

  constructor(private http: HttpClient) { }

  getBookedSlots(userEmail: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${userEmail}`);
  }

  deleteBookedSlot(slotId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${slotId}`);
  }

  rescheduleuserbookedslot(slotId: string, newData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${slotId}`, newData);
  }
}