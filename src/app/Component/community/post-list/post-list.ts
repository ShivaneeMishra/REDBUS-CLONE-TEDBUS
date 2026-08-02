import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Post } from '../../../service/post';
import { NotificationService } from '../../../service/notification';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-post-list',
  standalone: false,
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList implements OnInit {
  posts: any[] = [];
  activeSharePostId:string|null=null;
  reportingThreadId:string | null=null;
  reportReason:string='';
  
  constructor(
    private post: Post,
    private cdr: ChangeDetectorRef,
    private notificationService:NotificationService,
    private translate:TranslateService,
  ) {}
  ngOnInit(): void {
    this.post.getPosts().subscribe((data) => (this.posts = data as any[]));
    this.post.postCreated.subscribe(() => {
      this.post.getPosts().subscribe((data) => (this.posts = data as any[]));
      this.cdr.detectChanges();
    });
  }
  likePost(_id: string) {
    this.post.likePost(_id).subscribe(() => {
      console.log('Post liked successfully');
      this.cdr.detectChanges();
    });
  }

  addComment(_id: string, commentData: { text: string }) {
    this.post.addComment(_id, commentData).subscribe((response) => {
      console.log('Comment added successfully', response);
      this.cdr.detectChanges();
    });
    
  }
  toggleShareMenu(postId: string) {
  if (this.activeSharePostId === postId) {
    this.activeSharePostId = null; 
  } else {
    this.activeSharePostId = postId; 
  }
}
  shareOnFacebook(id: string) {
    const baseurl = window.location.origin;
    const url = `${baseurl}/community/${id}`;
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
    );
  }

  shareOnTwitter(id: string) {
    const baseurl = window.location.origin;
    const url = `${baseurl}/community/${id}`;
    const text = 'Check out this journey!';
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      '_blank',
    );
  }

  shareOnWhatsApp(id: string) {
    const baseurl = window.location.origin;
    const url = `${baseurl}/community/${id}`;
    const text = 'Check out this journey!';
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text)} - ${encodeURIComponent(url)}`,
      '_blank',
    );
  }
  onReportPost(postId: string) {
  this.reportingThreadId = postId;
  this.reportReason = '';
  
  }
  submitReport(postId: string) {
  if (!this.reportReason || this.reportReason.trim() === '') {
    this.notificationService.showNotification(this.translate.instant('REPORT_POST'));
    return;
  }
  
  this.post.reportForum(postId, this.reportReason).subscribe({
    next: (res) => {
      this.notificationService.showNotification(this.translate.instant('REPORT_SUCCESS_MSG'));
      this.reportingThreadId = null; 
    },
    error: (err) => {
      console.error('Report error:', err);
      this.notificationService.showNotification(this.translate.instant('REPORT_ERROR_MSG'));
    }
  });
}


cancelReport() {
  this.reportingThreadId = null; 
}
}


