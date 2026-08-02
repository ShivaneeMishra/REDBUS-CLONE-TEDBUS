import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../service/notification'; // अपना सही पाथ चेक कर लें

@Component({
  selector: 'app-notification',
  standalone:false,
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class Notification implements OnInit, OnDestroy {
  message?: string | null;
  private notificationSub!: Subscription;

  constructor(
    private notificationService: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.notificationSub = this.notificationService.notification$.subscribe((message) => {
      this.message = message;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.notificationSub) {
      this.notificationSub.unsubscribe();
    }
  }
}