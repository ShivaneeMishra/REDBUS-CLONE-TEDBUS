import { Component, Input, OnChanges, OnInit,  SimpleChanges, EventEmitter, Output,ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplyService } from '../../../../service/reply.service'; 
import { NotificationService } from '../../../../service/notification'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reply',
  standalone:false,
  templateUrl: './reply.html',
  styleUrls: ['./reply.css']
})
export class Reply implements OnInit , OnChanges{
  @Input() forumId!: string;
  replies: any[] = [];
  replyForm!: FormGroup;

  @Output() replyAdded =new EventEmitter<void>();

  constructor(private fb: FormBuilder, private replyService: ReplyService,private cdr: ChangeDetectorRef, private notificationService:NotificationService,
    private translate:TranslateService,
  ) {}

  ngOnInit(): void {
    this.replyForm = this.fb.group({
      content: ['', Validators.required],
      author: ['', Validators.required]
    });
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.forumId){
      this.fetchReplies();
      console.log(this.forumId)
      
    }
  }

  fetchReplies(): void {
    this.replyService.getRepliesByForumId(this.forumId).subscribe(data => {
      this.replies = data;
      this.cdr.detectChanges();

    });
  }

  submitReply(): void {
    console.log('forumId:',this.forumId)
    console.log('form value:',this.replyForm);
    
    if (this.replyForm.valid) {
      const payload = { ...this.replyForm.value, forumId: this.forumId };
      
      this.replyService.createReply(payload).subscribe(() => {
        this.fetchReplies();
        this.replyForm.reset();
        this.replyAdded.emit();
        this.cdr.detectChanges();

        this.notificationService.showNotification(this.translate.instant('REPLY_ADDED_SUCCESS'));
      });
    }
  }
}