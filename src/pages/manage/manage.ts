import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})

export class ManagePage {
  public mail = 'clui1@msn.com';
  public call = this;
  public  posts : any;
  public base64Image:string;
  myPhoto : any;

public statut : boolean = true;

  constructor(public http: Http,public alertCtrl: AlertController,
    private storage: Storage,private camera: Camera,private transfer: FileTransfer, private file: File) {
    var mail = 'clui1@msn.com';
    var call = this;
    var eemail : any;


}

ionViewDidLoad(){

  var eemail :any;
   this.storage.get('mail').then((val) => {
    eemail = val ;
  }).then(()=>{
  alert('storage affiche '+eemail);

  //mettre la requête serveur ici

  var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body = {

      mail: eemail

      };
      var url = 'http://192.168.1.18/geolocalisation/manageSuiveurs.php';
        return  this.http.post(url, body, {headers: headers} )
            .subscribe( (data) =>{
              if(data){
                console.log(data);
                this.posts = JSON.parse(data['_body']);

                //var suivi = call.posts[0].mail_suivi;
          //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
                alert("données formatées "+data['_body']);
                console.log("données formatées façon php "+data['_body']);
                console.log("données formatées précédé de any "+(<any>data)._body);


                if(JSON.parse(data['_body']) == "undefined"){
                //obj = JSON.parse(data);
                console.log("data body "+JSON.stringify(data));


                    //alert('Vous ne suivez personne pour le moment');
                    //this.storage.clear();
                }else{

                }
              }
            });
  });



}
presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Confirmation',
    message: 'Voulez-vous supprimer votre compte ?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmer',
        handler: () => {
          console.log('Buy clicked');
          this.supp();
        }

      }
    ]
  });
  alert.present();
}
envoiDemande(Mail){

  var eemail :any;
   this.storage.get('mail').then((val) => {
    eemail = val ;
  }).then(()=>{
  alert('storage affiche '+eemail);

  //mettre la requête serveur ici

  var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body = {

      mailDemandeur: eemail,
      mailSolicite : Mail

      };

      var url = 'http://192.168.1.18/geolocalisation/demandeSuivi.php';
        return  this.http.post(url, body, {headers: headers} )
            .subscribe( (data) =>{
              if(data){
                console.log(data);

                console.log("données formatées façon php  "+data['_body']);

                console.log("données formatées précédé de any "+(<any>data)._body);


                if(JSON.parse(data['_body']) == "ok"){
                  this.demandeAlert();

                }else{
                  this.notFoundAlert();
                }
              }
            });
  });



}
demandeAlert() {
  const alert = this.alertCtrl.create({
    title: 'Demande',
    subTitle: 'Votre demande a été envoyée avec succès !',
    buttons: ['OK']
  });
  alert.present();
}
notFoundAlert() {
  const alert = this.alertCtrl.create({
    title: 'Echec',
    subTitle: 'Cette adresse mail n est pas référencée !',
    buttons: ['OK']
  });
  alert.present();
}
supp(){
  var headers = new Headers();
      headers.append('Content-Type', 'application/json');
  var body = {
  mail: 'machin'
};
  var url = 'http://192.168.1.18/geolocalisation/supprimerCompte.php';
    return  this.http.post(url, body, {headers: headers} )
        .subscribe( (data) =>{

          if(JSON.parse(data['_body']) == "compte supprime"){

            this.showAlert();
          }

        });

      //renvoi vers home.ts
}
showAlert() {
  const alert = this.alertCtrl.create({
    title: 'Compte supprimé',
    subTitle: 'Votre comte a été supprimé avec succès !',
    buttons: ['OK']
  });
  alert.present();
}
      suivi(mail_suivi,statut_suivi,mail_suiveur){
          alert("changement prit en compte "+mail_suivi+" statut : "+statut_suivi);
          var headers = new Headers();
              headers.append('Content-Type', 'application/json');
              var body = {

              mail_suivi: mail_suivi,
              statut_suivi : statut_suivi,
              mail_suiveur : mail_suiveur

              };

              var url = 'http://192.168.1.18/geolocalisation/manageSuiveurs.php';
                return  this.http.post(url, body, {headers: headers} )
                    .subscribe( (data) =>{
                      if(data){
                        console.log(data);

                  //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
                        alert(data['_body']);
                        this.ionViewDidLoad();

                        //fin
                        }
                      });

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


              //https://www.youtube.com/watch?v=M1vMRAgt4NM 4 min 22
              const fileTransfer : FileTransferObject = this.transfer.create();
              var random = Math.floor(Math.random()* 100);
              let options: FileUploadOptions = {
                 fileKey: 'photo',
                 fileName: 'name_'+random+'.jpg', //revoir le nom  user
                 chunkedMode: false,
                 httpMethod : 'post',
                 mimeType: "image/jpeg",
                 headers: {}

              }

              fileTransfer.upload(this.myPhoto, 'http://192.168.1.18/geolocalisation/upload.php', options)
               .then((data) => {
                 // success
                 alert('success');
               }, (err) => {
                 // error
                 alert("error");
               })

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
