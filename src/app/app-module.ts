import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Navbar } from './Component/navbar/navbar';
import { Footer } from './Component/footer/footer';
import { LandingPage } from './Component/landing-page/landing-page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { SelectbusPage } from './Component/selectbus-page/selectbus-page';
import { Header } from './Component/selectbus-page/header/header';
import { Left } from './Component/selectbus-page/left/left';
import { Right } from './Component/selectbus-page/right/right';
import { MatIconModule } from '@angular/material/icon';
import { SortingBar } from './Component/selectbus-page/right/sorting-bar/sorting-bar';
import { BusBox } from './Component/selectbus-page/right/bus-box/bus-box';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { BusBook } from './Component/selectbus-page/right/bus-book/bus-book';
import { BottomTab } from './Component/selectbus-page/right/bus-book/bottom-tab/bottom-tab';
import { ViewSeats } from './Component/selectbus-page/right/view-seats/view-seats';
import { FormDrawer } from './Component/selectbus-page/right/form-drawer/form-drawer';
import { SmallSeats } from './Component/selectbus-page/right/small-seats/small-seats';
import { BusBookingForm } from './Component/selectbus-page/right/bus-booking-form/bus-booking-form';
import { PaymentPage } from './Component/payment-page/payment-page';
import { ProfilePage } from './Component/profile-page/profile-page';
import { MyTrip } from './Component/profile-page/my-trip/my-trip';
import { provideHttpClient } from '@angular/common/http';
@NgModule({
  declarations: [
    App,
    Navbar,
    Footer,
    LandingPage,
    SelectbusPage,
    Header,
    Left,
    Right,
    SortingBar,
    BusBox,
    BusBook,
    BottomTab,
    ViewSeats,
    FormDrawer,
    SmallSeats,
    BusBookingForm,
    PaymentPage,
    ProfilePage,
    MyTrip,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatSidenavModule,
    CommonModule,
    MatDividerModule,
  
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideNativeDateAdapter(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
