import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
public posts : any ;
  constructor(public navCtrl: NavController,public http: Http) {
////

var call = this;
//setInterval(function(){
function donnees(){
setInterval(function(){
     http
     .get('http://localhost/geolocalisation/data.php')
     .subscribe((data : any) =>
     {
        console.log(data._body);
        call.posts = JSON.parse(data._body);
     },
     (error : any) =>
     {
        console.dir(error);
     });
  }, 15000);
}
donnees();
   //faire une promesse pour l'affichage avec .then()

////
//}, 30000);



  }

}
