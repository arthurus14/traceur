import { Component } from '@angular/core';
import { NavController,AlertController,NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  //ici on redéclare les variables pour les utiliser
lat :any;
lng : any;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController,
    private navParams: NavParams,
  public geolocation : Geolocation,
public http: Http) {

var lat = (
  this.geolocation.getCurrentPosition().then((resp) => {
   this.lat = resp.coords.latitude
   alert(this.lat);
   return this.lat;
   // resp.coords.longitude
  }).catch((error) => {
    console.log('Error getting location', error);
  })
);
lat.then(function(){
  alert('ma lat '+Object.values(lat)[1]);
  //alert('lat data '+Object.entries(lat)[1])
  //console.log(Object.entries(lat)[1]);
  //console.log(Object.values(lat));
})

//essai







                    }
}
