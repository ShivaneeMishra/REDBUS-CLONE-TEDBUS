import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from '../config/index';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  
  private apiUrl = `${url}reviewRoutes`;

  constructor(private http: HttpClient) { }

  addReview(reviewData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reviewData);
  }

  
  getReviewsByBus(busId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${busId}`);
  }


  upvoteReview(reviewId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reviewId}/upvote`, {});
  }

  
  reportReview(reviewId: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${reviewId}/report`, {});
  }
  updateReview(reviewId: string, content: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${reviewId}`, { content });
}
}