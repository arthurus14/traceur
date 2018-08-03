import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

import { ManagePage } from '../manage/manage';

@Component({
  selector: 'page-espacePerso',
  templateUrl: 'espacePerso.html'
})

export class EspacePersoPage {
  //public mail = 'clui1@msn.com';
  public call = this;
  public eemail : any;


public statut : boolean = true;
public Mail : any;
  constructor(public http: Http,public alertCtrl: AlertController,
  public navCtrl: NavController,private storage: Storage,private navParams: NavParams) {
    //var mail = 'clui1@msn.com';
    var call = this;
    var mail = navParams.get("mail");

}

ionViewDidLoad(){

var eemail :any;
 this.storage.get('mail').then((val) => {
  this.eemail = val ;
}).then(()=>{
alert('storage affiche '+this.eemail);

//mettre la requête serveur ici

var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var body = {

    mail: this.eemail

    };
    var url = 'http://192.168.1.18/geolocalisation/search.php';
      return  this.http.post(url, body, {headers: headers} )
          .subscribe( (data) =>{
            if(data){
              console.log(data);
              this.posts = JSON.parse(data._body);

              //var suivi = call.posts[0].mail_suivi;
        //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
              alert(data._body);

              if(JSON.parse(data._body) == "undefined"){
              //obj = JSON.parse(data);
              console.log("data body "+JSON.stringify(data));


                  //alert('Vous ne suivez personne pour le moment');
                  //this.storage.clear();
              }else{

              }
            }
          });
});



}

change(mail_suivi,statut_suivi,mail_suiveur){
    alert("changement prit en compte "+mail_suivi+" statut : "+statut_suivi);
    var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var body = {

        mail_suivi: mail_suivi,
        statut_suivi : statut_suivi,
        mail_suiveur : mail_suiveur

        };

        var url = 'http://192.168.1.18/geolocalisation/manage.php';
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
          admin(){
            this.navCtrl.push(ManagePage, {
              //nom: this.nom,
              //prenom: this.prenom
            });
          }
}
