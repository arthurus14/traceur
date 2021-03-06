import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import { MapPage } from '../map/map';
import { EspacePersoPage } from '../espacePerso/espacePerso';
import { DetailsPage } from '../details/details';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = MapPage;
  tab5Root = EspacePersoPage;
  tab6Root = DetailsPage;

  constructor() {

  }
}
