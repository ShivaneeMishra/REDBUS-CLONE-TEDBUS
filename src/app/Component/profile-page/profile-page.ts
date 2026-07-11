import { Component, OnInit } from '@angular/core';
import { BusService } from '../../service/bus';
import { Booking } from '../../model/booking.model';


@Component({
  selector: 'app-profile-page',
  standalone: false,
  templateUrl: './profile-page.html',
  styleUrls: ['./profile-page.css'],
})
export class ProfilePage implements OnInit {
  
  selectedItem:string='trips';
  currentcustomer:any=[]
   currentname:string=''
  currentemail:string=''
  mytrip:Booking[]=[]


  handleListitemclick(selected:string):void{
    this.selectedItem=selected
}
constructor(private busbooking:BusService){}
  ngOnInit(): void {
    this.currentcustomer=sessionStorage.getItem('Loggedinuser')
    const user=JSON.parse(this.currentcustomer)
    this.currentname=user.name;
    this.currentemail=user.email;
    this.busbooking.getbusmongo(user._id).subscribe((response:any)=>{
      this.mytrip=response
      console.log(this.mytrip)
    })
  }
}