import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-espacePerso',
  templateUrl: 'espacePerso.html'
})

export class EspacePersoPage {

  constructor(public http: Http) {
    var mail = 'clui1@msn.com';
    var call = this;

    function load(){
        setTimeout(function(){
      //alert('recherche en cours');
      var headers = new Headers();
          headers.append('Content-Type', 'application/json');
          var body = {

          mail: mail

          };
          //alert("mail "+this.mail);
          var url = 'http://192.168.1.18/geolocalisation/search.php';
            return  http.post(url, body, {headers: headers} )
                .subscribe( (data) =>{
                  if(data){
                    console.log(data);
                    call.posts = JSON.parse(data._body);
                    var suivi = call.posts[0].mail_suivi;
              //faire un if connexion réussi -> création variable login ok et envoi vers map.ts sinon logout
                    alert(data._body);
                    
                    if(JSON.parse(data._body) == "undefined"){
                    //obj = JSON.parse(data);
                    console.log("data body "+JSON.stringify(data));


                        //alert('Vous ne suivez personne pour le moment');

                    }else{

                      //alert('Vous suivez des personnes');

                    }
                    //fin
                    }
                  });


    }, 1500);

   }
load();
}

}
