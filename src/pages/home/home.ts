import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import CryptoJS from 'crypto-js';
import { CreerComptePage } from '../creerCompte/creerCompte';

import { MapPage } from '../map/map';
import { ManagePage } from '../manage/manage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
nom : string;
prenom : string;
onoff : boolean;
public Mail :any ="";
public Password : any = "";
public _body : any="";

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,public http: Http,private navParams: NavParams,
    private sqlite: SQLite,private storage: Storage
  ) {}

login(bool){
var onoff : boolean  = false;
console.log("login : "+onoff);
console.log("login : "+bool);
onoff = bool;

}

    ionViewWillEnter() {

this.storage.get('renvoi').then((val) => {
  var d : any = val;
  return d;
}).then((d)=>{
  if(d == null ){
    //alert('mail NON trouvé '+d);
    console.log('VAL '+d);

  }else{
    this.navCtrl.push(ManagePage, {
      mail: d
    });
  }

});

      }



 ionViewDidLoad(){

this.storage.get('mail').then((val) => {
  var d : any = val;
  return d;
}).then((d)=>{
  if(d == null ){
    //alert('mail NON trouvé '+d);
    console.log('VAL '+d);
  }else{
    this.navCtrl.push(MapPage, {
      mail: d
    });
  }

});

}
select(log){
this.storage.set('login',log);
alert('storage enregistré '+log);
this.loadData();
}
loadData(){
  this.storage.get('login').then((val) => {
    if(val == true){
      this.navCtrl.push(MapPage, {
        mail: this.Mail
      });
    }
  });

}
  message():void{

   let alert = this.alertCtrl.create({
      title: 'Binvenue sur Traceur',
      subTitle: 'Géolocalisez vos devices',
      buttons: ['OK']
    });
    alert.present();

  }

showDetails(){
  this.navCtrl.push(CreerComptePage, {
  });
}

  creerCompte(Mail,Password){


var headers = new Headers();
      headers.append('Content-Type', 'application/json');


      var body = {
      mail: this.Mail,
      password: this.Password
      };


var url = 'http://tracker.freeboxos.fr/geolocalisation/connect.php';
    return  this.http.post(url, body, {headers: headers} )
        .subscribe( (data) =>{
          if(data){
            console.log(data);
            if(JSON.parse(data["_body"]) == "connexion reussie"){

            console.log("data body "+JSON.stringify(data));
              console.log("création variable login");
              var log = true;
              console.log(log);
              this.select(true);

                //alert('connexion réussie');
                this.storage.set('login',this.Mail);
                this.storage.set('mail',this.Mail);
                this.ionViewDidLoad();

            }else{
              console.log("logout");
              //alert('connexion échouée');

            }
            //fin
            }
          });

        }
      }
