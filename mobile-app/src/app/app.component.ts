import { AdvertisementPage } from './../pages/advertisement/advertisement';
import { PassengerProfilePage } from './../pages/passenger-profile/passenger-profile';
import { SingInPage } from './../pages/sing-in/sing-in';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { HA_Session } from '../providers/session/session';
import { ApiProvider } from '../providers/api/api';
import { RequestOptions, Headers } from '@angular/http';
import { DriverProfilePage } from '../pages/driver-profile/driver-profile';
import { AboutPage } from '../pages/about/about';
import { HistoryDriverPage } from '../pages/history-driver/history-driver';
import { HistoryPassengerPage } from '../pages/history-passenger/history-passenger';
import { HA_Storage } from '../providers/storage/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = this.session.isGuest() ? SingInPage : HomePage;
  pages:any;
  @ViewChild(Nav) nav: Nav;
  data:any;
  user:any = this.ls.get('HA_USER');
  constructor(platform: Platform, statusBar: StatusBar, 
    protected session:HA_Session,
    public ls: HA_Storage,
    private menuCtrl: MenuController,
    protected api :ApiProvider,
    public toast: ToastController,
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.menuCtrl.swipeEnable(false);
      splashScreen.hide();
    });
    this.pages = [
      { title: 'Advertisements', component: AdvertisementPage, icon: "ios-card-outline" },
      { title: 'About', component: AboutPage, icon: "ios-contacts-outline" },
    ];

  }
  home() {
    this.nav.setRoot(HomePage)
  }
  showToast(message){
    let toast = this.toast.create({
    message:message, 
    duration: 2000
    }); 
    toast.present(); 
    }
  goToProfileDriver() {
    if (this.session.isGuest()) {
      this.nav.push(SingInPage);
    } else {
      this.nav.push(DriverProfilePage);
    }
  }
  goToProfilePassenger(){
    if (this.session.isGuest()) {
      this.nav.push(SingInPage);
    } else {
      this.nav.push(PassengerProfilePage);
    }
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    this.ls.clear(); // clear all localStorage data including user
    this.nav.setRoot(SingInPage);
  }
  historyDriver() {
    this.nav.push(HistoryDriverPage)
  }
  historyPassenger() {
   this.nav.push(HistoryPassengerPage)
  }
}

