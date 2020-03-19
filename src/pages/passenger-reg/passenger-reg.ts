import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SingUpPage } from '../sing-up/sing-up';

@Component({
  selector: 'page-passenger-reg',
  templateUrl: 'passenger-reg.html',
})
export class PassengerRegPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerRegPage');
  }
  goBack() {
    this.navCtrl.push(SingUpPage)
  }
}
