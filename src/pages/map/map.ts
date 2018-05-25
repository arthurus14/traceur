import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import leaflet from 'leaflet';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
public posts : any ;
//map
@ViewChild('map') mapContainer: ElementRef;
map: any;
  constructor(public navCtrl: NavController,public http: Http) {

var call = this;

function donnees(){
setInterval(function(){
     http
     .get('http://localhost/geolocalisation/data.php')
     .subscribe((data : any) =>
     {
        call.posts = JSON.parse(data._body);

        console.log("latitude "+call.posts[0].lat+" longitude "+call.posts[0].lng);
        var lat = call.posts[0].lat;
        var lng = call.posts[0].lng;

//l'appel de la map ne doit pas se refaire à chaque interval
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
          let markerGroup = leaflet.featureGroup();
          let marker: any = leaflet.marker([lat,lng]).on('click', () => {
            alert('Marker clicked ');

          })

          markerGroup.addLayer(marker);
          call.map.addLayer(markerGroup);
          }).on('locationerror', (err) => {
            alert(err.message);
        })
}else{
  alert('map déjà chargée');
  call.map.locate({
    setView: true,
    maxZoom: 10 
  }).on('locationfound', () => {
    let markerGroup = leaflet.featureGroup();
    let marker: any = leaflet.marker([lat,lng]).on('click', () => {
      alert('Marker clicked ');

    })

    markerGroup.addLayer(marker);
    call.map.addLayer(markerGroup);
    }).on('locationerror', (err) => {
      alert(err.message);
  })
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
  //Map
/*
  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap(lat,lng) {
     this.map = leaflet.map("map").fitWorld();
     leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
       maxZoom: 18
     }).addTo(this.map);
     this.map.locate({
       setView: true,
       maxZoom: 10
     }).on('locationfound', (e) => {
       let markerGroup = leaflet.featureGroup();
       let marker: any = leaflet.marker([e.latitude, e.longitude]).on('click', () => {
         alert('Marker clicked '+this.lat);
       })
       markerGroup.addLayer(marker);
       this.map.addLayer(markerGroup);
       }).on('locationerror', (err) => {
         alert(err.message);
     })

   }
*/
};
