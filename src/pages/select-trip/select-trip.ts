import { SelectedTripPage } from './../selected-trip/selected-trip';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { RequestOptions, Headers } from '@angular/http';
import { HA_Session } from '../../providers/session/session';
import { PassengerProfilePage } from '../passenger-profile/passenger-profile';

@Component({
  selector: 'page-select-trip',
  templateUrl: 'select-trip.html',
})
export class SelectTripPage {
  trips:any = []
  users:any = []
  data: any = {}
  loader:any = {};
  alert: any = {};
  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    protected api:ApiProvider,
    public toast: ToastController,
    public session:HA_Session,
    public navParams: NavParams) {
      // this.loader = this.loadingCtrl.create({
      //   content: 'Loading...'
      // });
      // this.loader.present();
      this.api.getData('historyDriver.php').subscribe(
         data => {
          //  this.loader.dismiss();
           this.trips  = data
          });
          this.api.getData('getuser.php').subscribe(
            data => {
              this.users  = data
        });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectTripPage');
  }
  goBack() {
    this.navCtrl.pop()
  }
  showToast(message){
    let toast = this.toast.create({
    message:message, 
    duration: 2000
    }); 
    toast.present(); 
    }
    chooseDriver(trip) {
      this.data.driver_id = trip.id
      console.log(this.data.driver_id)
    }
  ConfirmTrip() {
    if(this.data.pointfrom == null || this.data.pointto== null || this.data.seats== null || this.data.starttime==null){
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
    else
    {
    this.loader = this.loadingCtrl.create({
      content: 'Post Trip'
    });
    this.loader.present();

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });  
    this.data.carno = this.session.user.carmodel;
    this.data.status_id = 4;
    this.data.member_id = this.session.user.id;
    this.api.postData('postSelectTrip.php',this.data,options)
    .subscribe(
      (data:any) => {	
        this.loader.dismiss();	
        if (data.error) {
              this.alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Can't Select Trip",
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
              this.showToast("Selected Trip successfully"); 				
              this.navCtrl.setRoot(SelectedTripPage,this.data);							
            }
          },
          (error:any) => {
            this.showToast("'Oops!', 'Something went wrong!', 'Server'"); 
            this.loader.dismiss();
          },
      );
      this.data.member_id = this.session.user.id;
      this.data.type_id = this.session.user.typeid;
      this.data.points = Number(10) + Number(this.session.user.points);
      this.api.postData('updatePoints.php',this.data,options)
      .subscribe(
        (data:any) => {	
          this.loader.dismiss();	
          if (data.error) {
                this.alert = this.alertCtrl.create({
                  title: "Error",
                  subTitle: "Can't Update Points",
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
                this.showToast("Updated Points successfully"); 				
                // this.navCtrl.setRoot(PassengerProfilePage);							
              }
            },
            (error:any) => {
              this.showToast("'Oops!', 'Something went wrong!', 'Server'"); 
              this.loader.dismiss();
            },
        );
  }
  }
  moveFocus(nextElement) {
    nextElement.focus();
  }
}
