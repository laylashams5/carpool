import { HistoryPassengerPage } from './../history-passenger/history-passenger';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { TripDetailPage } from '../trip-detail/trip-detail';
import { RequestOptions, Headers } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';
import { PassengerProfilePage } from '../passenger-profile/passenger-profile';

@Component({
  selector: 'page-selected-trip',
  templateUrl: 'selected-trip.html',
})
export class SelectedTripPage {
 data:any = {}
 trip:any = {}
 formData:any = {}
 loader:any = {};
 alert: any = {};
  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public toast: ToastController,
    protected api:ApiProvider,
    public navParams: NavParams) {
    this.trip = this.navParams.data
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectedTripPage');
  }
  goBack() {
    this.navCtrl.setRoot(PassengerProfilePage)
  }


}
