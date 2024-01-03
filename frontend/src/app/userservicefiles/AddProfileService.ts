import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/profile'; 

  constructor(private http: HttpClient) {}

  saveProfile(userProfile: any): Observable<any> {
    return this.http.post(this.apiUrl, userProfile);
  }
}