import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { RequestOptions, Headers } from '@angular/http';
import { HA_Session } from '../../providers/session/session';
import { PostedTripPage } from '../posted-trip/posted-trip';
import { DriverProfilePage } from '../driver-profile/driver-profile';

@Component({
  selector: 'page-post-trip',
  templateUrl: 'post-trip.html',
})
export class PostTripPage {
  points:any  = [
    // {id:1,pointfrom:'Nile St',pointto:'Jamma St',starttime:'8:00 Am',seat:'3'},
    // {id:2,pointfrom:'Jamma St',pointto:'Jumhouria St',starttime:'12:00 Pm',seat:'2'},
    // {id:3,pointfrom:'Jumhouria St',pointto:'Mak St',starttime:'5:00 Pm',seat:'1'},
    // {id:4,pointfrom:'Mak Nimir St',pointto:'Nile St',starttime:'6:00 Pm',seat:'2'},
  ]
  data:any ={};
  loader:any = {};
  alert: any = {};
  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    protected api:ApiProvider,
    public toast: ToastController,
    protected session:HA_Session,
    public navParams: NavParams) {
    this.loader = this.loadingCtrl.create({
      content: 'Loading...'
    });
    this.loader.present();
    this.api.getData('getPostTrip.php').subscribe(
       data => {
         this.loader.dismiss();
         this.points  = data
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostTripPage');
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
  postTrip() {

    if(this.data.cityfrom == null || this.data.cityto== null || this.data.seats== null || this.data.arrivetime==null){
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

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });  
    this.data.carno = this.session.user.carmodel;
    this.data.status_id = 1;
    this.data.member_id = this.session.user.id;
    this.api.postData('postTrip.php',this.data,options)
    .subscribe(
      (data:any) => {	
        this.loader.dismiss();	
        if (data.error) {
              this.alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Can't Post Trip",
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
              this.showToast("Posted Trip successfully"); 				
              this.navCtrl.setRoot(PostedTripPage,data);							
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
                // this.navCtrl.setRoot(DriverProfilePage);							
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
