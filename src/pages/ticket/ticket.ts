import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner, 
    public navParams: NavParams) {
      // Optionally request the permission early
    }

  goBack() {

  }
  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
}
