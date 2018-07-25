import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
//import * as Map from '../../models/mapping';
import 'rxjs/add/operator/map';
//importer la page avec laquelle je veux interagir
import { DetailsPage } from '../details/details';

import { CreerComptePage } from '../creerCompte/creerCompte';

import { MapPage } from '../map/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
//on déclare les variables

nom : string;
prenom : string;

onoff : boolean ;

//gps

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
if(bool == true){
  this.ionViewDidLoad(bool);
}

//faire une session pour concerver la valeur
}

 ionViewDidLoad(bool){
alert("coucou");
   this.sqlite.create({
     name: 'data.db',
     location: 'default'
   })
     .then((db: SQLiteObject) => {
       db.executeSql('CREATE TABLE IF NOT EXISTS user (login INTEGER  NOT NULL DEFAULT 0, mail TEXT, mdp TEXT)'
       , {})
         .then(() => console.log('Executed SQL'))
         .catch(e => console.log(e));
         alert('bdd créée');
     }).catch(e => console.log(e));
     this.loadData();
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
      alert('push vers map');
      /*faire un push avec NavParams*/
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
    //nom: this.nom,
    //prenom: this.prenom
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
      alert("mail "+Object.values(body)[0]+
      " mdp "+Object.values(body)[1]
    );


var url = 'http://192.168.1.18/geolocalisation/connect.php';
    return  this.http.post(url, body, {headers: headers} )
        .subscribe( (data) =>{
          if(data){
            console.log(data);

      //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
            alert(data._body);
            if(JSON.parse(data._body) == "connexion reussie"){
            //obj = JSON.parse(data);
            console.log("data body "+JSON.stringify(data));
              console.log("création variable login");
              var log = true;
              console.log(log);
              this.select(true);
                //update log = 1 dans la bdd
                alert('connexion réussie');
                this.sqlite.create({
                  name: 'data.db',
                  location: 'default'
                })
                  .then((db: SQLiteObject) => {
                    db.executeSql('INSERT INTO user (login) VALUES (1) ', {})
                      .then(() => console.log('Executed SQL'))
                      .catch(e => console.log(e));
                      alert('bdd MAJ');
                  })
                  .catch(e => console.log(e));
                /*
               this.navCtrl.push(MapPage, {
                  log: "true" //vérifier si la variable est bien reçue
                 });
              */

            }else{
              console.log("logout");
              alert('connexion échouée');
              //this.login(false);
              //this.init();//appel fonction
            }
            //fin
            }
          });


        }
      }
