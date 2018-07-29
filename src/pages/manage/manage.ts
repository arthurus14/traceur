import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})

export class ManagePage {
  public mail = 'clui1@msn.com';
  public call = this;


public statut : boolean = true;

  constructor(public http: Http) {
    var mail = 'clui1@msn.com';
    var call = this;
}

ionViewDidLoad(){

  var mail = 'clui1@msn.com';
  var call = this;

alert('hello');
var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var body = {

    mail: mail

    };
    var url = 'http://192.168.1.18/geolocalisation/manageSuiveurs.php';
      return  this.http.post(url, body, {headers: headers} )
          .subscribe( (data) =>{
            if(data){
              console.log(data);
              call.posts = JSON.parse(data._body);

              //var suivi = call.posts[0].mail_suivi;
        //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
              alert(data._body);

              if(JSON.parse(data._body) == "undefined"){
              //obj = JSON.parse(data);
              console.log("data body "+JSON.stringify(data));


                  //alert('Vous ne suivez personne pour le moment');

              }else{

              }
            }
          });


}


      suivi(mail_suivi,statut_suivi,mail_suiveur){
          alert("changement prit en compte "+mail_suivi+" statut : "+statut_suivi);
          var headers = new Headers();
              headers.append('Content-Type', 'application/json');
              var body = {

              mail_suivi: mail_suivi,
              statut_suivi : statut_suivi,
              mail_suiveur : mail_suiveur

              };

              var url = 'http://192.168.1.18/geolocalisation/manageSuiveurs.php';
                return  this.http.post(url, body, {headers: headers} )
                    .subscribe( (data) =>{
                      if(data){
                        console.log(data);

                  //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
                        alert(data._body);
                        this.ionViewDidLoad();

                        //fin
                        }
                      });

            }
}
