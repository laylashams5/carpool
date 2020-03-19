import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.loadMap();
  }
  goBack() {

  }
  loadMap(){
  }
}
