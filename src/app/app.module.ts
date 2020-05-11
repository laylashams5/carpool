import { HistoryPassengerPage } from './../pages/history-passenger/history-passenger';
import { HistoryDriverPage } from './../pages/history-driver/history-driver';
import { SelectedTripPage } from '../pages/selected-trip/selected-trip';
import { SelectTripPage } from '../pages/select-trip/select-trip';
import { AdvertisementPage } from '../pages/advertisement/advertisement';
import { TripDetailPage } from '../pages/trip-detail/trip-detail';
import { DriverProfilePage } from '../pages/driver-profile/driver-profile';
import { PassengerRegPage } from '../pages/passenger-reg/passenger-reg';
import { SingInPage } from '../pages/sing-in/sing-in';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SingUpPage } from '../pages/sing-up/sing-up';
import { DriverRegPage } from '../pages/driver-reg/driver-reg';
import { PassengerProfilePage } from '../pages/passenger-profile/passenger-profile';
import { PasswordCheckPage } from '../pages/password-check/password-check';
import { LocationPage } from '../pages/location/location';
import { TicketPage } from '../pages/ticket/ticket';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PostTripPage } from '../pages/post-trip/post-trip';
import { PostedTripPage } from '../pages/posted-trip/posted-trip';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ApiProvider } from '../providers/api/api';
import { HttpModule } from '@angular/http';
import { HA_Storage } from '../providers/api/storage/storage';
import { HA_Session } from '../providers/session/session';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { AboutPage } from '../pages/about/about';
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { FilterPipe } from '../pipes/filter/filter';
import { QrcodePage } from '../pages/qrcode/qrcode';
let pages = [
  MyApp,
  HomePage,
  SingInPage,
  SingUpPage,
  DriverRegPage,
  PassengerRegPage,
  PassengerProfilePage,
  DriverProfilePage,
  PasswordCheckPage,
  LocationPage,
  TripDetailPage,
  TicketPage,
  AdvertisementPage,
  AboutPage,
  SelectTripPage,
  PostTripPage,
  PostedTripPage,
  SelectedTripPage,
  HistoryDriverPage,
  HistoryPassengerPage,
  QrcodePage
]
@NgModule({
  declarations: [
    pages,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicImageViewerModule,
    NgxQRCodeModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    pages
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    HttpClientModule,
    HttpClient,
    ApiProvider,
    HA_Storage,
    HA_Session,
    Camera,
    FileTransfer,
    SocialSharing
  ]
})
export class AppModule {}
