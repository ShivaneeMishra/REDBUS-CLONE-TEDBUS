import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '../../service/notification'; 

@Component({
  selector: 'app-notification-history',
  standalone:false,
  templateUrl: './notification-history.html',
  styleUrls: ['./notification-history.css']
})
export class NotificationHistory implements OnInit {
  notifications: any[] = [];
  userId: string = ''; 

  constructor(private notificationService: NotificationService,private cdr:ChangeDetectorRef) {}

 ngOnInit(): void {
  const loggedinuserjson = sessionStorage.getItem('Loggedinuser');
  if (loggedinuserjson) {
    try {
      const parsedUser = JSON.parse(loggedinuserjson);
      this.userId = parsedUser._id || parsedUser.id || parsedUser;
    } catch (e) {
      this.userId = loggedinuserjson;
    }
  }
  
  this.fetchHistory();
}

  fetchHistory() {
    this.notificationService.getHistory(this.userId).subscribe(
      (res: any) => {
        if (res.success) {
          this.notifications = res.data;
          this.cdr.detectChanges();
        }
      },
      (error) => {
        console.error('Error fetching notification history:', error);
      }
    );
  }
}