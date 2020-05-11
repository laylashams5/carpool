import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { HA_Storage } from '../../providers/api/storage/storage';
import { Http } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';
import { HA_Session } from '../../providers/session/session';
import { TripDetailPage } from '../trip-detail/trip-detail';

@Component({
  selector: 'page-history-passenger',
  templateUrl: 'history-passenger.html',
})
export class HistoryPassengerPage {
  trips:any = []
  passengertrips:any = []
  loader:any = {};
  alert: any = {};
  constructor(public navCtrl: NavController, 
    public session:HA_Session,
    protected api :ApiProvider,
    protected http:Http,
    protected ls:HA_Storage,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public navParams: NavParams) {
      this.loader = this.loadingCtrl.create({
        content: 'Loading...'
      });
      this.loader.present();
      this.api.getData('historyPassenger.php').subscribe(
         data => {
           this.loader.dismiss();
           this.passengertrips  = data
           this.trips = this.passengertrips.filter(elm=>elm.member_id == session.user.id)
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPassengerPage');
  }
  goBack() {
    this.navCtrl.pop()
  }
  goToTrip(trip) {
    this.navCtrl.push(TripDetailPage,trip)
  }
}
