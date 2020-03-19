import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SingUpPage } from '../sing-up/sing-up';
import { PasswordCheckPage } from '../password-check/password-check';
@Component({
  selector: 'page-sing-in',
  templateUrl: 'sing-in.html',
})
export class SingInPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingInPage');
  }
  signUp() {
    this.navCtrl.push(SingUpPage)
  }
  passwordCheck() {
    this.navCtrl.push(PasswordCheckPage)
  }
}
