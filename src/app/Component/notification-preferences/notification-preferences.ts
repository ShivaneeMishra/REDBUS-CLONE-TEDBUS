import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../service/notification';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-preferences',
  standalone:false,
  templateUrl: './notification-preferences.html',
  styleUrls: ['./notification-preferences.css']

})
export class NotificationPreferences implements OnInit {
  userId: string = '';
  preferences = {
    emailEnabled: true,
    pushEnabled: true,
    promoEnabled: false,
    preferredLanguage: 'en'
  };

  constructor(private notificationService: NotificationService,private translate:TranslateService) {}

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
    console.log("preference loaded");
    this.loadPreferences();
  }

  loadPreferences(): void {
  this.notificationService.getPreferences(this.userId).subscribe(
    (res: any) => {
      if (res.success && res.data) {
        this.preferences = res.data;
      }
    },
    (error) => {
      console.error('Error loading preferences:', error);
    }
  );
}

savePreferences(): void {
  console.log("Saving preferences for user:", this.userId);
  console.log("Data being sent:", this.preferences);

  this.notificationService.updatePreferences(this.userId, this.preferences).subscribe(
    (res: any) => {
      console.log("Server Response:", res);
      if (res.success) {
        this.notificationService.showNotification(this.translate.instant('PREFERENCES_UPDATED_SUCCESS'));
        this.loadPreferences();
      }
    },
    (error) => {
      console.error('API Error details:', error);
    }
  );
}
}