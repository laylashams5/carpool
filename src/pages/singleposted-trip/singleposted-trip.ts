import { RequestOptions, Headers } from '@angular/http';
import { HistoryDriverPage } from './../history-driver/history-driver';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-singleposted-trip',
  templateUrl: 'singleposted-trip.html',
})
export class SinglepostedTripPage {
  trip:any = {}
  formData:any = {}
  loader:any = {};
  alert: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    protected api:ApiProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public toast: ToastController) {
    this.trip = this.navParams.data

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinglepostedTripPage');
  }
  goBack() {
    this.navCtrl.setRoot(HomePage)
  }
  showToast(message){
    let toast = this.toast.create({
    message:message, 
    duration: 2000
    }); 
    toast.present(); 
    }
    CancelPostedTrip() {
      if(this.trip.id == null || this.trip.status_id== null){
        this.alert = this.alertCtrl.create({
          title: "Error",
          subTitle: "Please you should enter all data",
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
          content: 'Cancel Booking'
        });
        this.loader.present();
      var headers = new Headers();
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      let options = new RequestOptions({ headers: headers }); 
      this.formData.id = this.trip.id
      //trip canceled == 3
      this.formData.status_id = 3
      this.api.postData('updatePostTrip.php',this.formData,options)
      .subscribe(
        (data:any) => {	
          this.loader.dismiss();	
          if (data.error) {
                this.alert = this.alertCtrl.create({
                  title: "Error",
                  subTitle: "Can't Cancel Booking",
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
                this.navCtrl.setRoot(HistoryDriverPage);							
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
