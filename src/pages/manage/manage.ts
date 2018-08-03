import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { NavController,AlertController,NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
})

export class ManagePage {
  public mail = 'clui1@msn.com';
  public call = this;
  public  posts : any;


public statut : boolean = true;

  constructor(public http: Http,public alertCtrl: AlertController,private storage: Storage) {
    var mail = 'clui1@msn.com';
    var call = this;
    var eemail : any;


}

ionViewDidLoad(){

  var eemail :any;
   this.storage.get('mail').then((val) => {
    eemail = val ;
  }).then(()=>{
  alert('storage affiche '+eemail);

  //mettre la requête serveur ici

  var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var body = {

      mail: eemail

      };
      var url = 'http://192.168.1.18/geolocalisation/manageSuiveurs.php';
        return  this.http.post(url, body, {headers: headers} )
            .subscribe( (data) =>{
              if(data){
                console.log(data);
                this.posts = JSON.parse(data._body);

                //var suivi = call.posts[0].mail_suivi;
          //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
                alert("données formatées "+data._body);
                console.log("données formatées façon php "+data['_body']);
                console.log("données formatées précédé de any "+(<any>data)._body);
                

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
presentConfirm() {
  let alert = this.alertCtrl.create({
    title: 'Confirmation',
    message: 'Voulez-vous supprimer votre compte ?',
    buttons: [
      {
        text: 'Annuler',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirmer',
        handler: () => {
          console.log('Buy clicked');
        }
      }
    ]
  });
  alert.present();
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
