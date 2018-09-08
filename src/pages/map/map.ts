import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import leaflet from 'leaflet';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
//import {NativeGeocoder,NativeGeocoderForwardResult} from "@ionic-native/native-geocoder";

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
var log = navParams.get("log");
var mail = navParams.get("mail");
var loc = this;


var map;
var markers = [];
var markersLayer = new leaflet.LayerGroup();

var loadMap = function(){
  this.map = leaflet.map("map").fitWorld() ;
  leaflet
    .tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attributions: "www.tphangout.com",
      maxZoom: 18
    })
    .addTo(this.map);
    this.map.locate({
      setView: true,
      maxZoom: 18
    });

}
//loadMap();

var updateMap = function(){

markersLayer.clearLayers();

var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var body = {
    //mail: eemail
    };
    call.http.get('http://192.168.1.18/geolocalisation/data.php')
    .subscribe((data : any) =>
    {
        call.posts = JSON.parse(data._body);

        for(var i =0; i< call.posts.length; i++){

          var lat = call.posts[i].lat;
          var lng = call.posts[i].lng;
          var pseudo = call.posts[i].mail;
          var date = call.posts[i].dateHeure;


        var marker: any = leaflet.marker([lat,lng]).on('click', () => {
          alert(date);

        }).bindTooltip(pseudo, {permanent: true, offset: [0, 0]})

        markersLayer.addLayer(marker);
        call.map.addLayer(markersLayer);
      }//fin boucle for

    });

}

setInterval(function(){
 updateMap();
}, 15000);


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

             mail : mail
           };
     var url = 'http://192.168.1.18/geolocalisation/connect.php';
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
          maxZoom: 18
        })
        .addTo(this.map);
        this.map.locate({
          setView: true,
          maxZoom: 18
        });


  }







}
