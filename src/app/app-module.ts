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
import { Community } from './Component/community/community';
import { PostList } from './Component/community/post-list/post-list';
import { PostForm } from './Component/community/post-form/post-form';
import { Notification } from './Component/notification/notification';
import { Forum } from './Component/community/forum/forum';
import { Reply } from './Component/community/forum/reply/reply';
import { ReactiveFormsModule } from '@angular/forms';
import { Moderation } from './Component/community/moderation/moderation';

import { NotificationPreferences } from './Component/notification-preferences/notification-preferences';
import { NotificationHistory } from './Component/notification-history/notification-history';
import { RoutePlanner } from './Component/route-planner/route-planner';
import { provideTranslateService,  TranslateDirective } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatePipe } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BusReviews } from './Component/selectbus-page/right/bus-book/bus-reviews/bus-reviews';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    Community,
    PostList,
    PostForm,
    Notification,
    Forum,
    Reply,
    Moderation,
    NotificationPreferences,
    NotificationHistory,
    RoutePlanner,
    BusReviews,
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
    ReactiveFormsModule,
    TranslatePipe,
    MatSnackBarModule,
    TranslateDirective,
    MatTooltipModule,
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNativeDateAdapter(),
    provideHttpClient(),
    provideTranslateService({
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader(),
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
