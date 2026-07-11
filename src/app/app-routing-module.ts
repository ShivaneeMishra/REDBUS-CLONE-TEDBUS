import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPage } from './Component/landing-page/landing-page';
import { SelectbusPage } from './Component/selectbus-page/selectbus-page';
import { PaymentPage } from './Component/payment-page/payment-page';
import { ProfilePage } from './Component/profile-page/profile-page'; 
const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'select-bus', component: SelectbusPage },
  { path:'payment',component:PaymentPage},
  { path:'profile',component:ProfilePage},

  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
