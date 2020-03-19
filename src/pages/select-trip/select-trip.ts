import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-select-trip',
  templateUrl: 'select-trip.html',
})
export class SelectTripPage {
  trips:any = [
    {id:1,cityfrom:'Khartoum',cityto:'Bahri',movetime:'12:30 Pm l 20-4-2-2020 ',point:''},
    {id:2,cityfrom:'Khartoum',cityto:'Bahri',movetime:'12:30 Pm l 20-4-2-2020 ',point:''},
    {id:3,cityfrom:'Khartoum',cityto:'Bahri',movetime:'12:30 Pm l 20-4-2-2020 ',point:''},
    {id:4,cityfrom:'Khartoum',cityto:'Bahri',movetime:'12:30 Pm l 20-4-2-2020 ',point:''},
  ]
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectTripPage');
  }

}
