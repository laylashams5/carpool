import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

@Component({
  selector: 'page-advertisement',
  templateUrl: 'advertisement.html',
})
export class AdvertisementPage {
  slider:any = [
    {id:1, image:'assets/imgs/slide1.png'},
    {id:1, image:'assets/imgs/slide2.jpg'},
    {id:1, image:'assets/imgs/slide3.jpg'},
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertisementPage');
  }
  changeSlides(event: Slides) {
    event.loop = true;
  }
 goBack() {

 }
}
