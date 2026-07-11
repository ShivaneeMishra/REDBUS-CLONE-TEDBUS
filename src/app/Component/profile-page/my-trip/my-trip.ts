import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-trip',
  standalone: false,
  templateUrl: './my-trip.html',
  styleUrl: './my-trip.css'
})
export class MyTrip  {
  @Input() booking:any
 

  imageArr = [
    
    // Other image objects...
    {
      _id: {
        $oid: "6049b8a97501a24470b9a527",
      },
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmSm5dHXflUbcRHzVKH8QosxkbrDPsWZsK0ts9avCA8X9GHkALxF5g996f&s=10",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a528",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/9365/1087/GW/DL/hDsqel.jpeg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a529",
      },
      images:
        "data:image/jpeg;base64,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",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52a",
      },
      images:
        "https://gos3.ibcdn.com/img-1713444352.jpg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52b",
      },
      images:
        "https://tiimg.tistatic.com/fp/1/003/177/bus-ticket-booking-service-969.jpg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52c",
      },
      images:
        "https://content3.jdmagicbox.com/v2/comp/delhi/k2/011pxx11.xx11.100419160931.a6k2/catalogue/volvo-bus-ticket-booking-darya-ganj-delhi-travel-agents-tve1vobi40.jpg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52d",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/16/OT/L/lejRej.jpeg",
    },
    {
      _id: {
        $oid: "6049b8a97501a24470b9a52e",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/1087/GW/DL/6fNUIf.jpeg",
    },
    {
      _id: {
        $oid: "6049d3567501a24470b9a533",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/4957/54/FR/L/lejRej.jpeg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bef",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/9365/1087/GW/DL/hDsqel.jpeg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf0",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/1087/GW/DL/6fNUIf.jpeg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf1",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/1087/GW/DL/6fNUIf.jpeg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf2",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/5483/35/FR/DL/AHGCEp.jpeg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf3",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/10/54/FR/L/lejRej.jpeg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf4",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/420/SI/DL/RdzzBG.jpeg",
    },
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf6",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/5483/35/FR/DL/AHGCEp.jpeg",
    },
    
    {
      _id: {
        $oid: "604b8aedb3f0410d74d91bf8",
      },
      images:
        "https://s3-ap-southeast-1.amazonaws.com/rb-plus/BI/APP/IND/WM/2323/1087/GW/DL/6fNUIf.jpeg",
    },
  ];


  randomimage:string=''
  ngOnInit(){
    const randomindex=Math.floor(Math.random() * this.imageArr.length);
    this.randomimage=this.imageArr[randomindex].images
  }
  // getrandomimage():string{
  //   return this.imageArr[Math.floor(Math.random()*(18-0+1)+0)].images
  // }
}