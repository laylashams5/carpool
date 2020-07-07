import { SinglepostedTripPage } from './../singleposted-trip/singleposted-trip';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HA_Session } from '../../providers/session/session';
import { ApiProvider } from '../../providers/api/api';
import { Http } from '@angular/http';
import { TripDetailPage } from '../trip-detail/trip-detail';
import { HA_Storage } from '../../providers/storage/storage';

@Component({
  selector: 'page-history-driver',
  templateUrl: 'history-driver.html',
})
export class HistoryDriverPage {
  trips:any = []
  drivertrips:any = []
  loader:any = {};
  alert: any = {};
  constructor(public navCtrl: NavController,
    public session:HA_Session,
    protected api :ApiProvider,
    protected http:Http,
    protected ls:HA_Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public navParams: NavParams) {
      this.loader = this.loadingCtrl.create({
        content: 'Loading...'
      });
      this.loader.present();
      this.api.getData('historyDriver.php').subscribe(
         data => {
           this.loader.dismiss();
           this.drivertrips  = data
           this.trips = this.drivertrips.filter(elm=>elm.member_id == session.user.id)
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryDriverPage');
  }
  goBack() {
    this.navCtrl.pop()
  }
  goToTrip(trip) {
    this.navCtrl.push(SinglepostedTripPage,trip)
  }
}
