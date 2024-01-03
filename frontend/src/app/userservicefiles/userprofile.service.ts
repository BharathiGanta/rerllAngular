import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private baseUrl = 'http://localhost:3000'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  getUserProfile(email: string): Observable<any> {
    const url = `${this.baseUrl}/user/profile/${email}`;
    return this.http.get(url);
  }
// UserProfileService

updateUserProfile(user: any): Observable<any> {
  const url = `${this.baseUrl}/user/profile/update?email=${user.email}`;
  return this.http.put(url, user);
}

}