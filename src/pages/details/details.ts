import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers,RequestOptions } from '@angular/http';

import { HomePage } from '../home/home';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
//ici on redéclare les variables pour les utilisers
lat :any;
lng : any;


  constructor(public navCtrl: NavController,public alertCtrl: AlertController,
    private navParams: NavParams,
  public geolocation : Geolocation,
public http: Http,private storage: Storage) {

}

ionViewDidEnter(){
  let alert = this.alertCtrl.create({
    title: 'Confirmation',
    message: 'Voulez-vous vous déconnecter?',
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
          this.storage.clear();
          this.navCtrl.push(HomePage, {

          });

        }

      }
    ]
  });
  alert.present();

  }

}
