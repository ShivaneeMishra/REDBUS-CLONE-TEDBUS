import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { url } from '../config/index';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  sendMessage(arg0: string) {
    throw new Error('Method not implemented.');
  }
  private notificationSubject = new BehaviorSubject<string | null>(null);
  notification$ = this.notificationSubject.asObservable();

  private apiUrl = `${url}notificationRoutes`;

  constructor(private http: HttpClient){}

  showNotification(message: string) {
    this.notificationSubject.next(message);
    setTimeout(() => this.clearNotification(), 3000); 
  }

  clearNotification() {
    this.notificationSubject.next(null);
  }

  getHistory(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/history/${userId}`);
  }

  
  getPreferences(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/preferences/${userId}`);
  }

  
  updatePreferences(userId: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/preferences/${userId}`, data);
  }

  getBookings(userId: string): Observable<any> {
    return this.http.get(`${url}booking/${userId}`);
  }

  
  cancelBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${url}booking/cancel/${bookingId}`);
  }
  
updateSchedule(bookingId: string, data: any): Observable<any> {
  return this.http.put(`${url}booking/update/${bookingId}`, data);
}
  
}