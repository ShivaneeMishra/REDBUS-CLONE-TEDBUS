import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../service/post';
import { NotificationService } from '../../../service/notification';
import { TranslateService } from '@ngx-translate/core'; 

@Component({
  selector: 'app-post-form',
  standalone: false,
  templateUrl: './post-form.html',
  styleUrls: ['./post-form.css'],
})
export class PostForm implements OnInit {
  post: any = {};
  topics: any[] = [];
  selectedFile: File | null = null;
  isUserLoggedIn: boolean = false;

  constructor(
    private postService: Post,
    private notificationService: NotificationService,
    private translate: TranslateService,
  ) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('Loggedinuser')) {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
    this.postService.getTopics().subscribe((data: any) => {
      this.topics = data;
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.post.title || '');
    formData.append('content', this.post.content || '');

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.postService.addPost(formData).subscribe((data) => {
      console.log('Post added successfully', data);
      this.notificationService.showNotification(this.translate.instant('POST_ADDED_SUCCESS'));
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFile = file;
  }
}
