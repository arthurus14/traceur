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
   this.lat = resp.coords.latitude;

   //alert(this.lat);
  return this.lat;

  }).catch((error) => {
    console.log('Error getting location', error);
  })
);
var lng = (
  this.geolocation.getCurrentPosition().then((resp) => {
   this.lng = resp.coords.longitude
   //alert(this.lng);
   return this.lng;

  }).catch((error) => {
    console.log('Error getting location', error);
  })
);
lng.then(function(){

  //alert('ma lat '+Object.values(lat)[1]);
  alert('ma lng '+Object.values(lng)[1]);
});
lat.then(function(){
//la latitude est calculée avant la longitude, il faut respecter l'ordre. serve

  alert('ma lat '+Object.values(lat)[1]+'ma longitude '+Object.values(lng)[1]);
  //alert('ma lng '+Object.values(lng)[1]);

  var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
          lat: Object.values(lat)[1],
          lng: Object.values(lng)[1]
        };
  var url = 'http://localhost/geolocalisation/connect.php';
        http.post(url, body, {headers: headers})
          .subscribe( (data) =>{
            if(data){
              console.log(data);
              }
            });
});



//essai







                    }
}
