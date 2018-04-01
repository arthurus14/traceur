import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  //ici on redéclare les variables pour les utiliser
  nom : string;
  prenom : string;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,
    private navParams: NavParams,
  private geolocation : Geolocation) {

//on récupère les varialbes transmises depuis l'autre HomePage
this.nom = navParams.get('nom');
this.prenom = navParams.get('prenom');

//console.log(this.nom);
//console.log(this.prenom);

this.geolocation.getCurrentPosition().then((resp) => {
  //let userPosition : LatLng = new LatLng(resp.coords.latitude,resp.coords.longitude);
 // resp.coords.latitude
 // resp.coords.longitude
 console.log('latitude'+resp.coords.latitude);
 console.log('longitude'+resp.coords.longitude);
}).catch((error) => {
  console.log('Error getting location', error);
});
  }

}
