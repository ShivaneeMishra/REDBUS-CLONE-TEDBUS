
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-bus-box',
  standalone: false,
  templateUrl: './bus-box.html',
  styleUrls: ['./bus-box.css'],
  
})
export class BusBox {
@Input() rating:number[]=[];
@Input() operatorname:string=''
@Input() bustype:string=''
@Input() departuretime:string=""
@Input() reschedulable :number=0
@Input() livetracking: number=0
@Input() filledseats:any[]=[]
@Input() routedetails: any
@Input() busid:string=''
totalreview:number=0
seatprivce:number=0
bustypename:string=''
busdeparturetime:number=0;
busarrivaltime:number=0
avgrating: any;
ngOnInit() {
  this.avgrating = 0;
  this.totalreview = 0;

  if (this.rating && this.rating.length > 0) {
    this.rating.forEach((item) => {
      this.avgrating += item;
    });
    this.totalreview = this.rating.length;
    this.avgrating = this.avgrating / this.totalreview;
  } else {
    this.avgrating = 0;
    this.totalreview = 0;
  }

  if(this.bustype === 'standard'){
    this.seatprivce = 50 * Math.floor(this.routedetails.duration);
    this.bustypename = 'standard';
  } else if(this.bustype === 'sleeper'){
    this.seatprivce = 100 * Math.floor(this.routedetails.duration);
    this.bustypename = 'sleeper';
  } else if(this.bustype === 'A/C Seater'){
    this.seatprivce = 125 * Math.floor(this.routedetails.duration);
    this.bustypename = 'A/C Seater';
  } else {
    this.seatprivce = 75 * Math.floor(this.routedetails.duration);
    this.bustypename = 'Non - A/C';
  }
}
}
