import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FamilyBookedSlotService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getFamilyBookedSlots(userEmail: string): Observable<any[]> {
    const url = `${this.baseUrl}/familybookedslot`;

    const headers = { 'user-email': userEmail };

    return this.http.get<any[]>(url, { headers });
  }
  deleteFamilyBookedSlot(slotId: string): Observable<void> {
    const url = `${this.baseUrl}/familybookedslot/${slotId}`;
    return this.http.delete<void>(url);
  }

  updateFamilyBookedSlot(slot: any): Observable<void> {
    const url = `${this.baseUrl}/familybookedslot/${slot.id}`;
    return this.http.put<void>(url, slot);
  }
}