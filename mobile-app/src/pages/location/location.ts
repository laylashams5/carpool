import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Polyline,
} from '@ionic-native/google-maps';
declare var google;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  private driverMarker: Marker;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(){
    this.loadMap();
  }
  goBack() {
    this.navCtrl.pop()
  }
  loadMap(){
    let latLng = new google.maps.LatLng(15.6091033, 32.5365566);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(this.map);
    // this.addMarker1(this.map)
  }
  addMarker(map:any) {
    let marker = new google.maps.Marker({
      map: map,
      icon:  {         
      url: "'assets/imgs/pointer-driver2.png'",
      scaledSize: new google.maps.Size(30, 30)    
      } ,
      animation: google.maps.Animation.DROP,
      position: map.getCenter()
    });
  }
  // addMarker1(map:any) {
  //   let marker = new google.maps.Marker({
  //     map: map,
  //     animation: google.maps.Animation.DROP,
  //     position: map.getCenter()
  //   });
  // }
}
