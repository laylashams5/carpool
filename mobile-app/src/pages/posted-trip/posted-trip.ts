import { HistoryDriverPage } from './../history-driver/history-driver';
import { RequestOptions, Headers } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { DriverProfilePage } from '../driver-profile/driver-profile';
import { HA_Session } from '../../providers/session/session';
import { ApiProvider } from '../../providers/api/api';
import { TripDetailPage } from '../trip-detail/trip-detail';

@Component({
  selector: 'page-posted-trip',
  templateUrl: 'posted-trip.html',
})
export class PostedTripPage {
  data: any = {
  };
  trip:any = {}
  loader:any = {};
  alert: any = {};
  formData:any = {}
  constructor(public navCtrl: NavController, 
    protected session:HA_Session,
    protected api:ApiProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public toast: ToastController,
    public navParams: NavParams) {
      this.trip = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostedTripPage');
  }
    goBack() {
      this.navCtrl.setRoot(DriverProfilePage)
    }

}
