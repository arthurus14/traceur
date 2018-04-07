import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import { Geolocation } from '@ionic-native/geolocation';


//importation des pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { DetailsPage } from '../pages/details/details'; //le nom est didentique à la classe dans le .ts
import { CreerComptePage } from '../pages/creerCompte/creerCompte';
import { EspacePersoPage } from '../pages/espacePerso/espacePerso';
import { MapPage } from '../pages/map/map';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NetworkEngineProvider } from '../providers/network-engine/network-engine';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    CreerComptePage,
    EspacePersoPage,
    ContactPage,
    MapPage,
    HomePage,
    TabsPage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
     HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    EspacePersoPage,
    CreerComptePage,
    ContactPage,
    MapPage,
    ContactPage,
    HomePage,
    TabsPage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    Geolocation ,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NetworkEngineProvider
  ]
})
export class AppModule {}
