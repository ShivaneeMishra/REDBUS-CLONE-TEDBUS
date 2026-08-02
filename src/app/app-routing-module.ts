import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './Component/landing-page/landing-page';
import { SelectbusPage } from './Component/selectbus-page/selectbus-page';
import { PaymentPage } from './Component/payment-page/payment-page';
import { ProfilePage } from './Component/profile-page/profile-page';
import { Community } from './Component/community/community';
import { Moderation } from './Component/community/moderation/moderation';
import { NotificationHistory} from './Component/notification-history/notification-history';
import { NotificationPreferences } from './Component/notification-preferences/notification-preferences';
import { MyTrip } from './Component/profile-page/my-trip/my-trip';
import { RoutePlanner } from './Component/route-planner/route-planner';
const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'select-bus', component: SelectbusPage },
  { path:'payment',component:PaymentPage},
  { path:'profile',component:ProfilePage},
  { path:'community',component:Community},
  { path:'moderation',component:Moderation},
  { path:'notification-history',component:NotificationHistory},
  { path:'notification-preferences',component:NotificationPreferences},
  {path:'my-trip', component:MyTrip},
  {path:'route-planner',component:RoutePlanner},

 
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
