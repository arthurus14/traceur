import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
public items : Array<any> = [];
  constructor(public navCtrl: NavController,public http: Http) {
////
function donnees(){
setInterval(function(){


var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body = {
        mail : "clui1@msn.com"
      };
var url = 'http://localhost/geolocalisation/data.php';
      http.post(url, body, {headers: headers})
        .subscribe( (data : any) =>{
          {
            console.dir(data);
            //var result = JSON.parse(data);
            //console.log(result);
            //this.items = data;


            }
            //this.items = data;
          });


}, 15000);

}
donnees();

////

  }

}
