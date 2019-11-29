import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class AgentsComponent implements OnInit {

  constructor(private menu: MenuController, private navigation: NavController) { }

  ngOnInit() {}

  navigateTopUp(){
    this.menu.close();
    this.navigation.navigateForward('agent/top-up');
  }

  navigateHome(){
    this.menu.close();
    this.navigation.navigateForward('agent/home');
  }

  navigateTransaction(){
    this.menu.close();
    this.navigation.navigateForward('agent/transactions');
  }

  logout(){
    this.menu.close();
    localStorage.clear();
    this.navigation.navigateRoot('login');
  }

}
