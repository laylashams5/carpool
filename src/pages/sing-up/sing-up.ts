import { PassengerRegPage } from './../passenger-reg/passenger-reg';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DriverRegPage } from '../driver-reg/driver-reg';

@Component({
  selector: 'page-sing-up',
  templateUrl: 'sing-up.html',
})
export class SingUpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingUpPage');
  }
  goBack() {
    this.navCtrl.pop()
  }
  driverReg() {
    this.navCtrl.setRoot(DriverRegPage)
  }
  passengerReg() {
    this.navCtrl.setRoot(PassengerRegPage)
  }
}
