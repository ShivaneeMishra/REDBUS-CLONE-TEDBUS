import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { url } from '../config/index';

@Injectable({
  providedIn: 'root',
})
export class Post {
  getForumById(threadId: string) {
    return this.http.get(`${this.forumApiUrl}/${threadId}`);
  }
  getForums() {
     return this.http.get<any[]>(this.forumApiUrl);

  }
  private apiUrl = `${url}communitypost`;
  private forumApiUrl = `${url}ForumRoutes`;
  postCreated = new Subject<any>();
  commentCreated = new Subject<any>();
  likeCreated = new Subject<any>();

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(this.apiUrl);
  }
  addPost(postData: any) {
    this.postCreated.next(postData);
    return this.http.post(this.apiUrl, postData);
    
  }
  likePost(_id: string) {
    this.likeCreated.next(_id);
    return this.http.post(`${this.apiUrl}/${_id}/like`, {});
  }
  addComment(_id: string, commentData: any) {
    this.commentCreated.next({ id: _id, commentData });
    return this.http.post(`${this.apiUrl}/${_id}/comment`, commentData);
  }
  getTopics() {
    return this.http.get(`${url}topics`);
  }
  addForum(forumData:any){
    return this.http.post(`${url}ForumRoutes`,forumData);
  }
  reportCommunityPost(_id: string, reason: string) {
  
  return this.http.post(`${url}communitypost/${_id}/report`, { reason });
}
reportForum(forumId: string, reason: string) {
  
  return this.http.put(`${url}ForumRoutes/report/${forumId}`, { reason });
}
getTrendingForum(){
   return this.http.get<any[]>(`${url}ForumRoutes/trending`);

}
updateForumStatus(_id:string,statusData:any){
  return this.http.put(`${this.forumApiUrl}/status/${_id}`,statusData);
}


updateCommunityPostStatus(_id:string,statusData:any){
  return this.http.put(`${this.apiUrl}/status/${_id}`,statusData);
}

deleteForumPost(id: string) {
  return this.http.delete(`${url}ForumRoutes/${id}`);
}


deleteCommunityPost(id: string) {
  return this.http.delete(`${url}communitypost/${id}`);
}

}

