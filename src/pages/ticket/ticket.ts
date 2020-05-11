import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApiProvider } from '../../providers/api/api';
import { HA_Session } from '../../providers/session/session';
import { RequestOptions, Headers } from '@angular/http';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-ticket',
  templateUrl: 'ticket.html',
})
export class TicketPage {
  qrcode = null;
  createdCode = null;
  order:any = {};
  loader:any = {};
  alert: any = {};
  formData:any = {}
  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner, 
    public navParams: NavParams,
    protected api:ApiProvider,
    protected session:HA_Session,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public toast: ToastController) {
      this.order = this.navParams.data
      // Optionally request the permission early
    }

  goBack() {
    this.navCtrl.pop()
  }
  scan() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.createdCode).then((data)=>{
      this.createdCode = data
      this.qrcode = this.createdCode
    },(err)=>{
      console.log('Error :', err)
    }
    )
    this.createdCode = this.order.qrcode;
    this.setArrived();
  }
  showToast(message){
    let toast = this.toast.create({
    message:message, 
    duration: 2000
    }); 
    toast.present(); 
    }
  setArrived() {
    if(this.order.id == null || this.order.status_id== null || this.order.qrcode == null){
      this.alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "This is order doesn't have QRcode",
        buttons: [{
          text: 'ok',
          role: 'cancel',
          handler: () => {
          }
        }]
      });
      this.alert.present();
      return;
    }
    else {
      this.loader = this.loadingCtrl.create({
        content: 'Confirm Trip'
      });
      this.loader.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers }); 
    this.formData.id = this.order.id
    this.formData.qrcode = this.order.qrcode
    //trip canceled == 3
    this.formData.status_id = 2
    this.api.postData('updateTrip.php',this.formData,options)
    .subscribe(
      (data:any) => {	
        this.loader.dismiss();	
        if (data.error) {
              this.alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Can't Confirm Trip",
                buttons: [{
                  text: 'ok',
                  role: 'cancel',
                  handler: () => {
                   this.loader.dismiss()
                  }
                }]
              });
  
              this.alert.present();
            }
            else {
              this.showToast("Updated successfully"); 				
              // this.navCtrl.setRoot(HomePage);							
            }
          },
          (error:any) => {
            this.showToast("'Oops!', 'Something went wrong!', 'Server'"); 
            this.loader.dismiss();
          },
      );
      }
  }

}
