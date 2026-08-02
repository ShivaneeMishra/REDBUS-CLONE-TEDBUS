import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { url } from '../config/index';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {
  private apiUrl = `${url}replyRoutes`;

  constructor(private http: HttpClient) { }

  getRepliesByForumId(forumId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${forumId}`);
  }

  createReply(replyData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, replyData);
  }
}