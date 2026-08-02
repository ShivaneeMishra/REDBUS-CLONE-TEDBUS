import { Component, ChangeDetectorRef } from '@angular/core';
import { Post } from '../../../service/post';
import { NotificationService } from '../../../service/notification';
import { TranslateService } from '@ngx-translate/core';

interface Thread {
[x: string]: any;
  _id: string;
  author: string;

  title: string;
  tags: { name: string; colorClass: string }[];
  replies: number;
  views: string;
  lastActiveTime: string;
  lastActiveUser: string;
  isViewed?: boolean;
}
function generateObjectId(): string {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16);
  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, () => {
        return Math.floor(Math.random() * 16).toString(16);
      })
      .toLowerCase()
  );
}

@Component({
  selector: 'app-forum',
  standalone: false,
  templateUrl: './forum.html',
  styleUrls: ['./forum.css'],
})
export class Forum {
  newAuthor: string = '';
  newTitle: string = '';
  newTag: string = '';
  isReplyVisible = false;
  selectedThreadId: string | null = null;
  thread: any;
  viewedThreads: string[] = [];
  isUserLoggedIn: boolean = false;
   activeSharePostId:string|null=null;
   trendingThreads:any[]=[];
   reportingThreadId:string | null=null;
   reportReason:string='';
  

  togglereply(threadId: string) {
    if (this.selectedThreadId === threadId) {
      this.selectedThreadId = null;
    } else {
      this.selectedThreadId = threadId;
      this.incrementViews(threadId);
    }
  }
  constructor(
    private post: Post,
    private cdr: ChangeDetectorRef,
    private notificationService:NotificationService,
    private translate:TranslateService,

  ) {}
  ngOnInit(): void {
  const loggedinuserjson = sessionStorage.getItem('Loggedinuser');
  if (loggedinuserjson) {
    try {
      const parsedUser = JSON.parse(loggedinuserjson);
      this.isUserLoggedIn = true;
      this.newAuthor = parsedUser.name || parsedUser.email || '';
    } catch (e) {
      this.isUserLoggedIn = true;
      this.newAuthor = loggedinuserjson;
    }
  } else {
    this.isUserLoggedIn = false;
  }
  this.loadTrendingForum();
}
  loadTrendingForum(){
    this.post.getTrendingForum().subscribe({
      next: (data)=>{
        this.trendingThreads = data;
        this.cdr.detectChanges();
      },
      error:(err)=>{
        console.error('Error fetching trending forum:',err)
      }
    });
  }
  threads: Thread[] = [];

  addThread(event: Event) {
    event.preventDefault();

    if (!this.newAuthor || !this.newTitle) {
      const msg = this.translate.instant('ENTER_NAME_TITLE_ERROR');
      this.notificationService.showNotification(msg);
      return;
    }


    const newThread: Thread = {
      _id: generateObjectId(),
      author: this.newAuthor,

      title: this.newTitle,
      tags: [{ name: this.newTag || 'General', colorClass: 'tag-orange' }],
      replies: 0,
      views: '0',
      lastActiveTime: 'Just now',
      lastActiveUser: this.newAuthor,
    };

    this.post.addForum(newThread).subscribe({
      next: (response) => {
        console.log('Backend response:', response);
        this.threads = [newThread, ...this.threads];
        this.newAuthor = '';
        this.newTitle = '';
        this.newTag = '';
        this.cdr.detectChanges();

        this.notificationService.showNotification(this.translate.instant('THREAD_POSTED_SUCCESS'));
      },
      error: (error) => {
        console.error('Backend error :', error);
        this.notificationService.showNotification(this.translate.instant('POST_SAVE_ERROR'));
      },
    });
  }

  incrementViews(threadId: string) {

    const thread = this.threads.find((t) => t._id === threadId);
    if (!thread || thread.isViewed) {
      return;
    }
    
    thread.isViewed = true;
    this.post.getForumById(threadId).subscribe({
      next:(res:any)=>{
        thread.views = (parseInt(thread.views || '0', 10) + 1).toString();
        this.loadTrendingForum();
      },
      error:(err:any)=>{
        console.error("Error updating view count:", err);
      }
      
    })
  }
  incrementReplyCount(thread: Thread) {
    thread.replies = Number(thread.replies || 0) + 1;
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
  onReportForum(forumId: string) {
  this.reportingThreadId = forumId;
  this.reportReason = ''; 
}
submitReport(forumId: string) {
  if (!this.reportReason || this.reportReason.trim() === '') {
    this.notificationService.showNotification(this.translate.instant('REPORT_MSG'));
    return;
  }
  
  this.post.reportForum(forumId, this.reportReason).subscribe({
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


