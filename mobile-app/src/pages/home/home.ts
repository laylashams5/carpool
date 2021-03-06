import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HA_Session } from '../../providers/session/session';
import { ApiProvider } from '../../providers/api/api';
import { RequestOptions, Headers, Http } from '@angular/http';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  Marker,
  Polyline,
} from '@ionic-native/google-maps';
import { SelectTripPage } from '../select-trip/select-trip';
import { PostTripPage } from '../post-trip/post-trip';
import { HA_Storage } from '../../providers/storage/storage';

declare var google;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  user:any = {};
  passenger:any;
  @ViewChild('map') mapElement: ElementRef;
  map: GoogleMap;
  private driverMarker: Marker;

  constructor(
    public navCtrl: NavController,
    public session:HA_Session,
    protected api :ApiProvider,
    protected http:Http,
    protected ls:HA_Storage,
    public navParams: NavParams    ) {
  }
  ionViewDidLoad(){
    this.loadGoogleMap();
  }

  loadGoogleMap() {
    let latLng = new google.maps.LatLng(15.6091033, 32.5365566);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }
  selectTrip() {
    this.navCtrl.push(SelectTripPage)
  }
  postTrip() {
    this.navCtrl.push(PostTripPage)
  }
}
