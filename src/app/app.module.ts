import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile'
import { RegisterPage } from '../pages/register/register';
import { BrowsePage } from '../pages/browse/browse';
import { CharityPage } from '../pages/charity/charity';
import { DonationsPage } from '../pages/donations/donations';
import { EditPage } from '../pages/edit/edit';
import { PaymentPage } from '../pages/payment/payment';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../auth.service';
import { StripeJavaScriptPage } from '../pages/stripe-java-script/stripe-java-script';
import { StripeNativePage } from '../pages/stripe-native/stripe-native';
import { Stripe } from '@ionic-native/stripe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ProfilePage,
    RegisterPage,
    BrowsePage,
    CharityPage,
    PaymentPage,
    DonationsPage,
    EditPage,
    StripeJavaScriptPage,
    StripeNativePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ProfilePage,
    RegisterPage,
    BrowsePage,
    CharityPage,
    PaymentPage,
    DonationsPage,
    EditPage,
    StripeJavaScriptPage,
    StripeNativePage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Stripe,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
