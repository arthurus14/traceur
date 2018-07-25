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

  constructor(public navCtrl: NavController,public http: Http,private navParams: NavParams,
  private storage: Storage) {
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
      alert("mail "+Object.values(body)[0]+
      " mdp "+Object.values(body)[1]
    );


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
              this.select(true);
                //update log = 1 dans la bdd
                alert('Votre compte a été crée');
                /*
               this.navCtrl.push(MapPage, {
                  log: "true" //vérifier si la variable est bien reçue
                 });
              */
            }else{
              console.log("logout");
              alert('Ce mail est déjà enregistré');
              //this.login(false);
              //this.init();//appel fonction
            }
            //fin
            }
          });


        }

}
