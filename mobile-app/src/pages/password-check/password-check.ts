import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';
import { HA_Session } from '../../providers/session/session';
import { SingInPage } from '../sing-in/sing-in';


@Component({
  selector: 'page-password-check',
  templateUrl: 'password-check.html',
})

export class PasswordCheckPage {
  loader:any = {};
  alert: any = {};
  data: any = {
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    protected api:ApiProvider ,
    protected session:HA_Session,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordCheckPage');
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
  updatePassword() {
    if(this.data.email == null || this.data.password== null){
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
        content: 'Updating Password'
      });
      this.loader.present();
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });  
    this.api.postData('forgetPassword.php',this.data,options)
    .subscribe(
      (data:any) => {	
        this.loader.dismiss();	
        if (data.error) {
              this.alert = this.alertCtrl.create({
                title: "Error",
                subTitle: "Can't Update Password",
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
              this.navCtrl.setRoot(SingInPage);							
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
