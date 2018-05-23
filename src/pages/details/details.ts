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
  var loc = this;
setInterval(function(){
var lat = (
  loc.geolocation.getCurrentPosition().then((resp) => {
   loc.lat = resp.coords.latitude;

   //alert(this.lat);
  return loc.lat;

  }).catch((error) => {
    console.log('Error getting location', error);
  })
);
var lng = (
  loc.geolocation.getCurrentPosition().then((resp) => {
   loc.lng = resp.coords.longitude
   //alert(this.lng);
   return loc.lng;

  }).catch((error) => {
    console.log('Error getting location', error);
  })
);
lng.then(function(){

  //alert('ma lat '+Object.values(lat)[1]);
  // @ts-ignore
  //alert('ma lng '+Object.values(lng)[1]);
});
lat.then(function(){
//la latitude est calculée avant la longitude, il faut respecter l'ordre. serve

  //alert('ma lat '+Object.values(lat)[1]+'ma longitude '+Object.values(lng)[1]);
  //alert('ma lng '+Object.values(lng)[1]);



  var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {
          //@ts-ignore
          lat: Object.values(lat)[1],
          //@ts-ignore
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

}, 15000);

//essai







                    }
}
