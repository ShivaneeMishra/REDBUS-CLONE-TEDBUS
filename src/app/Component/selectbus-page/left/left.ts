import { Component } from '@angular/core';

@Component({
  selector: 'app-left',
  standalone: false,
  templateUrl: './left.html',
  styleUrls: ['./left.css'],
})
export class Left {
  amenityicons:{[key: string]: string} = {
    wifi:'wifi',
    waterBottle:'local_drink',
    chargingPoint:'battery_charging_full',
    blanket:'hotel',
    movie:'movie',
  }
  sidefiltervalues: any = {
    livetracking: false,
    reschedulable: false,
    departuretime: {
      'before 6 am': false,
      '6 am to 12 pm': false,
      '12pm to 6 pm ': false,
      'after 6 pm': false,
    },
    bustype: {
      Seater: false,
      Sleeper: false,
      Ac: false,
      Nonac: false,
    },
    arrivaltime: {
      'before 6 am': false,
      '6 am to 12 pm': false,
      '12pm to 6 pm ': false,
      'after 6 pm': false,
    },
    amenities: {
      wifi: false,
      waterBottle: false,
      blanket: false,
      chargingPoint: false,
      movie: false,
    },
  }

  getObjectKey(obj: any): string[] {
    return Object.keys(obj);
  }

  handlelivetrackingclick(): void {
    this.sidefiltervalues.livetracking = !this.sidefiltervalues.livetracking;
  }

  handlerescheduleclick(): void {
    this.sidefiltervalues.reschedulable = !this.sidefiltervalues.reschedulable;
  }

  handledeparturetimeclick(event: any, name: string): void {
    this.sidefiltervalues.departuretime[name] = event.target.checked;
  }

  handlearrivaltimeclick(event: any, name: string): void {
    this.sidefiltervalues.arrivaltime[name] = event.target.checked;
  }

  handlebustypeclick(event: any, name: string): void {
    this.sidefiltervalues.bustype[name] = event.target.checked;
  }
}
