import { Component, OnInit,Input ,ChangeDetectorRef} from '@angular/core';
import { Post } from '../../../service/post';
import { NotificationService } from '../../../service/notification';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-moderation',
  standalone: false,
  templateUrl: './moderation.html',
  styleUrls: ['./moderation.css']
})
export class Moderation implements OnInit {
  @Input() pageType: 'community' |'forum' ='community'
  isAdmin:boolean = true;
  forumPosts: any[] = [];
  communityPosts: any[] = [];
JSON: any;

  constructor(private postService: Post,private cdr:ChangeDetectorRef,private notificationService:NotificationService,
    private translate:TranslateService,
  ) {}

  ngOnInit(): void {
    this.loadPendingPosts();
  }

  loadPendingPosts() {
    
    this.postService.getPosts().subscribe((communityData: any) => {
      this.communityPosts = (communityData || []).map((item: any) => ({ ...item, postType: 'community' }));
      this.cdr.detectChanges();
    }, error => {
      console.error('Error fetching community posts', error);
    });

   
    this.postService.getForums().subscribe((forumData: any) => {
      this.forumPosts = (forumData || []).map((item: any) => ({ ...item, postType: 'forum' }));
       this.cdr.detectChanges();
    }, error => {
      console.error('Error fetching forums', error);
    });
  }

  approvePost(id: string, type: 'forum' | 'community') {
    const statusData = { status: 'approved' };
    
    if (type === 'forum') {
      this.postService.updateForumStatus(id, statusData).subscribe(res => {
        this.notificationService.showNotification(this.translate.instant('FORUM_APPROVED_SUCCESS'));
        this.loadPendingPosts();
      });
    } else {
      this.postService.updateCommunityPostStatus(id, statusData).subscribe(res => {
        this.notificationService.showNotification(this.translate.instant('COMMUNITY_APPROVED_SUCCESS'));
        this.loadPendingPosts();
      });
    }
  }

  rejectPost(id: string, type: 'forum' | 'community') {
    if (type === 'forum') {
      this.postService.deleteForumPost ? this.postService.deleteForumPost(id).subscribe(() => {
        this.notificationService.showNotification(this.translate.instant('FORUM_DELETED_SUCCESS'));
        this.loadPendingPosts();
      }) : '';
    } else {
      this.postService.deleteCommunityPost ? this.postService.deleteCommunityPost(id).subscribe(() => {
        this.notificationService.showNotification(this.translate.instant('COMMUNITY_DELETED_SUCCESS'));
        this.loadPendingPosts();
      }) : '';
    }
  }

isCommunityPage(): boolean {
  return window.location.href.includes('community'); 
}


isForumPage(): boolean {
  return window.location.href.includes('forum'); 
}
}