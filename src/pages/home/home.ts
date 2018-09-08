import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
//import * as Map from '../../models/mapping';
import 'rxjs/add/operator/map';
//importer la page avec laquelle je veux interagir

//crypto js

import CryptoJS from 'crypto-js';
import { DetailsPage } from '../details/details';

import { CreerComptePage } from '../creerCompte/creerCompte';

import { MapPage } from '../map/map';
import { ManagePage } from '../manage/manage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
//on déclare les variables

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
//return onoff;
/*
if(bool == true){
  this.ionViewDidLoad(bool);
  }
*/
//faire une session pour concerver la valeur
}


    ionViewWillEnter() {



      var result = this.storage.get('renvoi').then((val) => {

        var d : any = val;
        return d;
      }).then((d)=>{

        console.log('onPageWillEnter : '+d);
        if(d = 'vrai'){

          this.navCtrl.push(ManagePage);
        }

      });


      }



 ionViewDidLoad(){

//alert("coucou");
//this.storage.clear();
// Or to get a key/value pair
this.storage.get('mail').then((val) => {
  alert('your loaded log value is : '+val);
  var d : any = val;
  return d;
}).then((d)=>{
  alert('your loaded log value is : '+d);
  if(d == null ){
    alert('mail NON trouvé '+d);
    console.log('VAL '+d);
    /*faire un push avec NavParams*/
  }else{
    alert('envoi vers Map');
    this.navCtrl.push(MapPage, {
      mail: d
      //prenom: this.prenom
    });
  }

});

}
select(log){

// set a key/value

this.storage.set('login',log);
alert('storage enregistré '+log);
this.loadData();
}
loadData(){
  // Or to get a key/value pair
  this.storage.get('login').then((val) => {
    alert('your loaded log value is : '+val);
    if(val == true){
      alert('push vers map '+val);
      /*faire un push avec NavParams*/

      this.navCtrl.push(MapPage, {
        mail: this.Mail
        //prenom: this.prenom
      });

    }
  });

}

/*si mail déjà enregistré*/



/*fin mail déjà enregistré*/


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
        //@ts-ignore
      mail: this.Mail,

        //@ts-ignore
      password: this.Password

      };


var url = 'http://192.168.1.18/geolocalisation/connect.php';
    return  this.http.post(url, body, {headers: headers} )
        .subscribe( (data) =>{
          if(data){
            console.log(data);

      //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
            alert("modif _body "+data["_body"]);
            if(JSON.parse(data["_body"]) == "connexion reussie"){

            console.log("data body "+JSON.stringify(data));
              console.log("création variable login");
              var log = true;
              console.log(log);
              this.select(true);
                //update log = 1 dans la bdd
                alert('connexion réussie');

                /*mail*/
                this.storage.set('login',this.Mail);
                this.storage.set('mail',this.Mail);
                this.ionViewDidLoad();

            }else{
              console.log("logout");
              alert('connexion échouée');

            }
            //fin
            }
          });


        }
      }
