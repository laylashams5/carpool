import { HA_Session } from './../../providers/session/session';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AdvertisementPage } from '../advertisement/advertisement';
import { SelectTripPage } from '../select-trip/select-trip';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-passenger-profile',
  templateUrl: 'passenger-profile.html',
})
export class PassengerProfilePage {

  loader:any = {};
  alert: any = {};
  points:any = []
  result:any = []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    protected session:HA_Session,
    protected api:ApiProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    ) {
      this.loader = this.loadingCtrl.create({
        content: 'Loading...'
      });
      this.loader.present();
      this.api.getData('getPoints.php').subscribe(
         data => {
           this.loader.dismiss();
           this.points  = data
           this.result = this.points.filter(elm=> elm.member_id == session.user.id);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerProfilePage');
  }
  goBack() {
    this.navCtrl.setRoot(HomePage)
  }
  advertisement() {
    this.navCtrl.setRoot(AdvertisementPage)
  }
  selectTrip() {
    this.navCtrl.push(SelectTripPage)
  }
}
