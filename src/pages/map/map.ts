import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import leaflet from 'leaflet';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
public posts : any ;
public log : any;
public mail : any;
//map
@ViewChild('map') mapContainer: ElementRef;
map: any;
  constructor(public navCtrl: NavController,public http: Http,private navParams: NavParams,private storage: Storage) {

var call = this;
var log = navParams.get("log");
var mail = navParams.get("mail");



function donnees(){
setInterval(function(){
     http
     .get('http://192.168.1.18/geolocalisation/data.php')
     .subscribe((data : any) =>
     {
        call.posts = JSON.parse(data._body);
        console.log("log params "+log);
        console.log("latitude "+call.posts[0].lat+" longitude "+call.posts[0].lng);
        var lat = call.posts[0].lat;
        var lng = call.posts[0].lng;
        console.log('tableau de x éléments '+call.posts.length);
        alert("votre mail a été transmit pas navParams "+mail);
        

        if(call.map == null) {

        call.map = leaflet.map("map").fitWorld();
        leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18
        }).addTo(call.map);
        call.map.locate({
          setView: true,
          maxZoom: 18
        }).on('locationfound', () => {

          for(var i =0; i< call.posts.length; i++){
            let markerGroup = leaflet.featureGroup();
            var lat = call.posts[i].lat;
            var lng = call.posts[i].lng;
          let marker: any = leaflet.marker([lat,lng]).on('click', () => {
            alert('Vous avez cliqué !');

          }).bindPopup('nom de la personne')

          markerGroup.addLayer(marker);
          call.map.addLayer(markerGroup);
        }//fin boucle for
          }).on('locationerror', (err) => {
            alert(err.message);
        })
}else{


}
     },
     (error : any) =>
     {
        console.dir(error);
     });

  }, 15000);

}
donnees();

  }

};
