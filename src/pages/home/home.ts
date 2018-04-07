import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';


//import * as Map from '../../models/mapping';




//importer la page avec laquelle je veux interagir
import { DetailsPage } from '../details/details';

import { CreerComptePage } from '../creerCompte/creerCompte';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
//on déclare les variables

nom : string;
prenom : string;


//gps

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,public http: Http
  ) {

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
  //alert(this.nom+this.prenom);
//on passe les variable en paramètres
  this.navCtrl.push(DetailsPage, {
    nom: this.nom,
    prenom: this.prenom

  });
}

creerCompte(){
  //alert(this.nom+this.prenom);
//on passe les variable en paramètres
  this.navCtrl.push(CreerComptePage, {
    //nom: this.nom,
    //prenom: this.prenom

  });
}

serveur(nom,prenom){

/*
  var data = {
    nom: this.nom,
    prenom: this.prenom
  };
*/
/*$$$$$$$$$$*/

var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body = {
        nom: this.nom,
        prenom: this.prenom
      };

/*$$$$$$$$$$*/

var url = 'http://localhost/geolocalisation/connect.php';
      this.http.post(url, body, {headers: headers})
      .subscribe( (data) =>{
        if(data){
          console.log(data);
        }
      });


/*
this.http.get('http://localhost/geolocalisation/connect.php?nom='+this.nom,{data})

console.log(data);
*/
}

}
