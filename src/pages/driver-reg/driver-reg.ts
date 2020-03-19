import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SingUpPage } from '../sing-up/sing-up';

@Component({
  selector: 'page-driver-reg',
  templateUrl: 'driver-reg.html',
})
export class DriverRegPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverRegPage');
  }
  goBack() {
    this.navCtrl.push(SingUpPage)
  }
}
