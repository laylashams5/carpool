import { HA_Session } from './../../providers/session/session';
import { Component, ViewChild} from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';

import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { SingUpPage } from '../sing-up/sing-up';
import { PasswordCheckPage } from '../password-check/password-check';
import 'rxjs/add/operator/map';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { HA_Storage } from '../../providers/storage/storage';
@Component({
  selector: 'page-sing-in',
  templateUrl: 'sing-in.html',
})
export class SingInPage {

  data: any = {};
  loader:any = {};
  alert: any = {};
  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    protected api :ApiProvider,
    public loading: LoadingController,
    public navParams: NavParams,
	public loadingCtrl: LoadingController,
	public toast: ToastController,
	protected ls:HA_Storage,
	protected session:HA_Session,
	public events: Events,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingInPage');
  }
  showToast(message){
    let toast = this.toast.create({
    message:message, 
    duration: 2000
    }); 
    toast.present(); 
    }
  singIn() {
	if(this.data.username == null || this.data.password== null){
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
			content: 'Signing in'
		});
		this.loader.present();
		var headers = new Headers();
		headers.append("Accept", 'application/json');
		headers.append('Content-Type', 'application/json' );
		let options = new RequestOptions({ headers: headers }); 
		this.api.postData('login.php',this.data,options)
			.subscribe(
					(data:any) => {	
						this.session.setUser(data.data)
						this.events.publish('user:login');
						this.loader.dismiss();
						if (data.error) {
							this.alert = this.alertCtrl.create({
								title: "Error",
								subTitle: "Username Or mobile it's wrong",
								buttons: [{
									text: 'ok',
									role: 'cancel',
									handler: () => {
									 this.loader.dismiss()
									}
								}]
							});

							this.alert.present();
						} else {
							this.showToast("Login successfully"); 	
							this.ls.set('HA_USER', data.data);					
							this.navCtrl.setRoot(HomePage);							
						}
				  },
				  (error:any) => {
					this.showToast("'Oops!', 'Something went wrong!', 'Server'"); 
					this.loader.dismiss();
				},
			);
	  }
	}
  
  signUp() {
    this.navCtrl.push(SingUpPage)
  }
  passwordCheck() {
    this.navCtrl.push(PasswordCheckPage)
  }
}
