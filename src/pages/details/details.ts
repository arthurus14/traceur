import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  //ici on redéclare les variables pour les utiliser
  nom : string;
  prenom : string;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, private navParams: NavParams) {

//on récupère les varialbes transmises depuis l'autre HomePage
this.nom = navParams.get('nom');
this.prenom = navParams.get('prenom');

//console.log(this.nom);
//console.log(this.prenom);
  }

}
