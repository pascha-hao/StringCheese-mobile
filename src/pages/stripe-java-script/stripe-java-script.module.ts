import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StripeJavaScriptPage } from './stripe-java-script';

@NgModule({
  declarations: [
    StripeJavaScriptPage,
  ],
  imports: [
    IonicPageModule.forChild(StripeJavaScriptPage),
  ],
})
export class StripeJavaScriptPageModule {}
