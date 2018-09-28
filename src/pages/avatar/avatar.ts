import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { NavController,AlertController,NavParams,PopoverController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


import { HomePage } from '../home/home';
import { EspacePersoPage } from '../espacePerso/espacePerso';
@Component({
  selector: 'page-avatar',
  templateUrl: 'avatar.html'
})

export class AvatarPage {
  public mail = 'clui1@msn.com';
  public call = this;
  public  posts : any;
  public items : any;
  public base64Image:string;
  myPhoto : any;

public statut : boolean = true;


  constructor(public http: Http,public alertCtrl: AlertController,
    private storage: Storage,private camera: Camera,private transfer: FileTransfer, private file: File,private navParams: NavParams,public navCtrl: NavController,public popoverCtrl: PopoverController) {
    var mail = 'clui1@msn.com';
    var call = this;
    var eemail : any;


}

            openCamera(){

              const options: CameraOptions = {
              quality: 100,
              destinationType: this.camera.DestinationType.DATA_URL,
              encodingType: this.camera.EncodingType.JPEG,
              mediaType: this.camera.MediaType.PICTURE
            }

            this.camera.getPicture(options).then((imageData) => {
             // imageData is either a base64 encoded string or a file URI
             // If it's base64 (DATA_URL):
             this.myPhoto = 'data:image/jpeg;base64,' + imageData;



            }, (err) => {
             // Handle error
            });

            }

            upload(){


  var eemail :any;
   this.storage.get('mail').then((val) => {
    eemail = val ;
  }).then(()=>{

    //https://www.youtube.com/watch?v=M1vMRAgt4NM 4 min 22
              const fileTransfer : FileTransferObject = this.transfer.create();
              var random = Math.floor(Math.random()* 100);
              let options: FileUploadOptions = {
                 fileKey: 'photo',
                 fileName: eemail+'.jpg', //revoir le nom  user
                 chunkedMode: false,
                 httpMethod : 'post',
                 mimeType: "image/jpeg",
                 headers: {}
              }


              fileTransfer.upload(this.myPhoto, 'http://tracker.freeboxos.fr/geolocalisation/upload.php', options)
               .then((data) => {
                 // success
                 alert('success');
               }, (err) => {
                 // error
                 alert("error");
               })


  });



            }
        openGallery(){
          const options: CameraOptions = {
          quality: 100,
          destinationType: this.camera.DestinationType.DATA_URL,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          saveToPhotoAlbum:false
        }

        this.camera.getPicture(options).then((imageData) => {
         // imageData is either a base64 encoded string or a file URI
         // If it's base64 (DATA_URL):
         this.myPhoto = 'data:image/jpeg;base64,' + imageData;



        }, (err) => {
         // Handle error
        });

  }

}
