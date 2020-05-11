import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, LoadingController, Events, AlertController, ToastController } from 'ionic-angular';
import { RequestOptions, Headers } from '@angular/http';
import { ApiProvider } from '../../providers/api/api';
import { HomePage } from '../home/home';
import { ImageViewerController } from 'ionic-img-viewer';
import { HA_Session } from '../../providers/session/session';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-advertisement',
  templateUrl: 'advertisement.html',
})
export class AdvertisementPage {
  _imageViewerCtrl: ImageViewerController;
  data: any = {
  };
  slider:any = []
  loader:any = {};
  alert: any = {};
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    imageViewerCtrl: ImageViewerController,
    private socialSharing: SocialSharing,
    public events: Events,
    protected api:ApiProvider,
    protected session:HA_Session,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public toast: ToastController
    ) {
      this.loader = this.loadingCtrl.create({
        content: 'Loading...'
      });
      this.loader.present();
      this.api.getData('getslider.php').subscribe(
         data => {
           this.loader.dismiss();
           this.slider  = data
        });
        this._imageViewerCtrl = imageViewerCtrl;
        console.log(this.session.user)

  }
    
  showToast(message){
    let toast = this.toast.create({
    message:message, 
    duration: 2000
    }); 
    toast.present(); 
    }
  presentImage(myImage,slide) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();
    setTimeout(() => imageViewer.dismiss(), 1000);
    this.session.user.points = slide.points
    
    this.socialSharing.share("Advertisement Photo " + "http://localhost/carpool/system/images/{{slide.image}}" ).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });  
    this.data.member_id = this.session.user.id;
    this.data.type_id = this.session.user.typeid;
    this.data.points = Number(slide.points) + Number(this.session.user.points);
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
              this.showToast("Updated successfully"); 				
              this.navCtrl.setRoot(HomePage);							
            }
          },
          (error:any) => {
            this.showToast("'Oops!', 'Something went wrong!', 'Server'"); 
            this.loader.dismiss();
          },
      );
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertisementPage');
  }
  changeSlides(event: Slides) {
    event.loop = true;
  }
 goBack() {
  this.navCtrl.setRoot(HomePage)
 }
}
