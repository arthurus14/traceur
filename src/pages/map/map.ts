import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import leaflet from 'leaflet';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

//import {NativeGeocoder,NativeGeocoderForwardResult} from "@ionic-native/native-geocoder";
import { ManagePage } from '../manage/manage';
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
public posts : any ;
public log : any;
public mail : any;
public lat :any;
public lng : any ;
public post:any;
public markers:any;

//map
//@ViewChild('map') mapContainer;
@ViewChild('map') mapElement: ElementRef;
map: any;

  constructor(public navCtrl: NavController,public http: Http,private navParams: NavParams,
    private storage: Storage,
  public geolocation : Geolocation/*,private nativeGeocoder: NativeGeocoder*/) {

var call = this;
//var log = navParams.get("log");
var mails = navParams.get("mail");
var loc = this;


var map;
var markers = [];
var markersLayer = new leaflet.LayerGroup();


//loadMap();

 function updateMap(){

  setInterval(function(){

  markersLayer.clearLayers();

  // début requête http
var headers = new Headers();
    headers.append('Content-Type', 'application/json');
var body = new Promise(function(resolve) {
    var mail =  loc.storage.get("mail");
    resolve(mail);

});

body.then(function(valeur) {

//if(valeur == mail){//valeur n'est pas une variable et n'est pas lue comme telle
loc.http.get('http://tracker.freeboxos.fr/geolocalisation/data.php?mail='+valeur,{headers:headers}).map(res=>res.json())
    .subscribe((data : any) =>
    {
      loc.posts = data;
        var resp = data;
console.log("valeur type: "+typeof valeur);
console.log('valeur: '+valeur);
        for(var i =0; i< data.length; i++){
console.log('data : '+data[i].lat);
          var lat = data[i].lat;
          var lng = data[i].lng;
          var pseudo = data[i].mail;
          var date = resp[i].dateHeure;
          var LatLng = ([lat,lng]);
          console.log('coords: '+LatLng+ ' nom: '+pseudo);
          console.log(typeof LatLng);
          //console.log(parseFloat(LatLng));
          //var markerGroup = leaflet.featureGroup();
//var marker = leaflet.marker([49.3271,-0.397752])
        var marker = leaflet.marker(LatLng).on('click', () => {
          alert(pseudo);

        }).bindTooltip(pseudo, {permanent: true, offset: [2, 0]})

          //markerGroup.addLayer(marker);
          //call.map.addLayer(markerGroup);

          //leaflet.marker([49.3271, -0.397752]).addTo(call.map);

          markersLayer.addLayer(marker);
          call.map.addLayer(markersLayer);


      //fin boucle for


    }
});

//}
  //alert(valeur);


  }, function(raison) {
  console.log(raison); // Erreur !
});


  },15000);

}
updateMap();


function envoi (){


   setInterval(function(){
   var lat = (
     loc.geolocation.getCurrentPosition().then((resp) => {
      loc.lat = resp.coords.latitude;


     return loc.lat;

     }).catch((error) => {
       console.log('Error getting location', error);
     })
   );
   var lng = (
     loc.geolocation.getCurrentPosition().then((resp) => {
      loc.lng = resp.coords.longitude

      return loc.lng;

     }).catch((error) => {
       console.log('Error getting location', error);
     })
   );
   lng.then(function(){

   });
   lat.then(function(){

     var headers = new Headers();
           headers.append('Content-Type', 'application/json');
           var body = {
             //@ts-ignore
             lat: loc.lat,
             //@ts-ignore
             lng: loc.lng,

             mail : mails
           };
     var url = 'http://tracker.freeboxos.fr/geolocalisation/connect.php';
           loc.http.post(url, body, {headers: headers})
             .subscribe( (data) =>{
               if(data){
                 console.log(data);
                 }
               });
   });

   }, 15000);
 }
envoi();



  }


ionViewDidEnter() {

console.log('enter');
console.log(this.map);
//this.navCtrl.setRoot(this.navCtrl.getActive().component);

this.storage.set('renvoi','vrai');
//this.navCtrl.setRoot(ManagePage);
this.navCtrl.popToRoot();

}


ionViewDidLoad(){
  //this.map.clearCache();
  //document.getElementById('map').outerHTML=('');
  this.loadmap();
}
  loadmap() {
      this.map = leaflet.map("map").fitWorld() ;
      leaflet
        .tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attributions: "www.tphangout.com",
          maxZoom: 30
        })
        .addTo(this.map);
        this.map.locate({
          setView: true,
          maxZoom: 18
        });


  }







}
