import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-post-trip',
  templateUrl: 'post-trip.html',
})
export class PostTripPage {
  points:any  = [
    {id:1,pointfrom:'Nile St',pointto:'Jamma St',starttime:'8:00 Am',seat:'3'},
    {id:2,pointfrom:'Jamma St',pointto:'Jumhouria St',starttime:'12:00 Pm',seat:'2'},
    {id:3,pointfrom:'Jumhouria St',pointto:'Mak St',starttime:'5:00 Pm',seat:'1'},
    {id:4,pointfrom:'Mak Nimir St',pointto:'Nile St',starttime:'6:00 Pm',seat:'2'},
  ]
  formData:any ={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostTripPage');
  }

}
