
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
@Input() arrivaltime:string=""
@Input() reschedulable :number=0
@Input() livetracking: number=0
@Input() filledseats:any[]=[]
@Input() routedetails: any
@Input() busid:string=''
totalreview:number=0
seatprice:number=0
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
    this.seatprice = 50 * Math.floor(this.routedetails.duration);
    this.bustypename = 'standard';
  } else if(this.bustype === 'sleeper'){
    this.seatprice = 100 * Math.floor(this.routedetails.duration);
    this.bustypename = 'sleeper';
  } else if(this.bustype === 'A/C Seater'){
    this.seatprice = 125 * Math.floor(this.routedetails.duration);
    this.bustypename = 'A/C Seater';
  } else {
    this.seatprice = 75 * Math.floor(this.routedetails.duration);
    this.bustypename = 'Non - A/C';
  }
  const numericvalue=parseInt(this.departuretime,10);
  this.busdeparturetime=numericvalue
  this.busarrivaltime=(numericvalue + this.routedetails.duration) % 24;
}
}
