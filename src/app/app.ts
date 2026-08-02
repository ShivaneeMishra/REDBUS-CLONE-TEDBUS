import { Component, signal,OnInit } from '@angular/core';
import { NotificationService } from './service/notification';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  constructor(private notificationService:NotificationService){}


  ngOnInit(): void {
    this.notificationService.notification$.subscribe(message=>{
      console.log(message);
    })
    const savedTheme = localStorage.getItem('tedbus_theme') || 'light';
    
   if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
