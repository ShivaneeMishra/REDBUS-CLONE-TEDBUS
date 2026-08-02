import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { BusService } from '../../service/bus';
import { Post } from '../../service/post';
import { Booking } from '../../model/booking.model';

@Component({
  selector: 'app-profile-page',
  standalone: false,
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css'],
  encapsulation:ViewEncapsulation.None,
})
export class ProfilePage implements OnInit {
  selectedItem: string = 'trips';
  currentcustomer: any = [];
  currentname: string = '';
  currentemail: string = '';
  mytrip: Booking[] = [];
  userPosts: any[] = [];
  userForums: any[] = [];
  storedUser: any;

  handleListitemclick(selected: string): void {
    this.selectedItem = selected;
  }
  constructor(
    private busbooking: BusService,
    private postService: Post,
  ) {}
  ngOnInit(): void {
    this.storedUser = sessionStorage.getItem('Loggedinuser');
    if (this.storedUser) {
      let user: any;
      try {
        user = JSON.parse(this.storedUser);
      } catch (e) {
        
        user = { name: this.storedUser, _id: this.storedUser };
      }

      this.currentcustomer = user;
      this.currentname = user.name || this.storedUser;
      this.currentemail = user.email || '';

     
      this.busbooking.getbusmongo(user._id || user).subscribe((response: any) => {
        this.mytrip = response;
      });

      this.postService.getPosts().subscribe((res: any) => {
        console.log('Posts responnse:', res);
        this.userPosts = Array.isArray(res) ? res : res.posts || res.data || [];
      });

      this.postService.getForums().subscribe((forums: any) => {
        this.userForums = (forums || []).filter(
          (f: any) => f.status === 'approved' || f.status === 'approved',
        );
      });
    }
  }
}
