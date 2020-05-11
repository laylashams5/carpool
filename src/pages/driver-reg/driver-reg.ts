import { Http, RequestOptions,Headers } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController, Events } from 'ionic-angular';
import { SingUpPage } from '../sing-up/sing-up';
import { ApiProvider } from '../../providers/api/api';
import { Camera } from '@ionic-native/camera';
import { HA_Storage } from '../../providers/api/storage/storage';
import { HomePage } from '../home/home';
import { HA_Session } from '../../providers/session/session';

@Component({
  selector: 'page-driver-reg',
  templateUrl: 'driver-reg.html',
})
export class DriverRegPage {
  data: any = {
    carmodel:'',
    image:'',
  };
  loader:any = {};
  alert: any = {};
  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    protected api :ApiProvider,
    public http: Http, public toast: ToastController,
    public navParams: NavParams,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    protected session:HA_Session,
    public events: Events,
    protected ls:HA_Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverRegPage');
  }
    
  showToast(message){
    let toast = this.toast.create({
    message:message, 
    duration: 2000
    }); 
    toast.present(); 
    }
  goBack() {
    this.navCtrl.push(SingUpPage)
  }
  fileChange(evt) {
    var files = evt.target.files;
    var file = files[0];

  if (files && file) {
    this.data.imagename = file.name;
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
  }
  }
_handleReaderLoaded(readerEvt) {
  let binaryString = readerEvt.target.result;
  this.data.image = btoa(binaryString);
         //this.base64textString= btoa(binaryString);
         console.log(btoa(binaryString));
 }
 RegisterDriver() {
  if(this.data.username == null || this.data.password== null || this.data.email== null || this.data.phone==null || this.data.address==null){
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
  this.data.typeid = 2;
  this.api.postData('register.php',this.data,options)
  .subscribe(
    (data:any) => {	
      this.session.setUser(data.data)
      this.events.publish('user:login');
      this.loader.dismiss();	
      if (data.error) {
            this.alert = this.alertCtrl.create({
              title: "Error",
              subTitle: "Username Or mobile it's duplicated",
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
            this.showToast("Registered successfully"); 				
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
}
