import { Component } from '@angular/core';

import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Storage } from '@ionic/storage';
//import * as Map from '../../models/mapping';
import 'rxjs/add/operator/map';

import { MapPage } from '../map/map';

@Component({
  selector: 'page-creerCompte',
  templateUrl: 'creerCompte.html'
})
export class CreerComptePage {

public Pseudo :any;
public Mail : any;
public Password : any;

  constructor(public navCtrl: NavController,public http: Http,private navParams: NavParams,
  private storage: Storage,public alertCtrl: AlertController) {
    this.Pseudo="";
    this.Mail = "";
    this.Password = "";
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Bravo',
      subTitle: 'Votre compte a été crée avec succès',
      buttons: ['Ok']
    });
    alert.present();
  }

  indispo() {
    let alert = this.alertCtrl.create({
      title: 'oups',
      subTitle: 'cette adresse mail est déjà référencée',
      buttons: ['Ok']
    });
    alert.present();
    }

  signIn(Pseudo,Mail,Password){
  var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body = {
      pseudo : this.Pseudo,
        //@ts-ignore
      mail: this.Mail,
        //@ts-ignore
      password: this.Password
      };
      /*
      alert("mail "+Object.values(body)[0]+
      " mdp "+Object.values(body)[1]
    );
    */

  var url = 'http://192.168.1.18/geolocalisation/signIn.php';
    return  this.http.post(url, body, {headers: headers} )
        .subscribe( (data) =>{
          if(data){
            console.log(data);

      //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
            alert(data._body);
            if(JSON.parse(data._body) == "Votre compte a ete cree"){
            //obj = JSON.parse(data);
            console.log("data body "+JSON.stringify(data));
              console.log("création variable login");
              var log = true;
              console.log(log);
              //this.select(true);
                //update log = 1 dans la bdd
                alert('Votre compte a été crée en bdd');

                  this.presentAlert();



                  // set a key/value
                  this.storage.set('email',this.Mail);
                  alert('storage enregistré '+this.Mail);
                    // Or to get a key/value pair
                  this.storage.get('email').then((val) => {
                  alert('votre mail va être stocké en localStorage: '+this.Mail);
                });

               this.navCtrl.push(MapPage, {
                  log: "true", //vérifier si la variable est bien reçue
                  mail: this.Mail
                 });

            }else{
              console.log("logout");
              alert('Ce mail est déjà enregistré en bdd');
              this.indispo();
              //this.login(false);
              //this.init();//appel fonction
            }
            //fin
            }
          });


        }

}
