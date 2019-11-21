import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.page.html',
  styleUrls: ['./top-up.page.scss'],
})
export class TopUpPage implements OnInit {

  constructor(private menu: MenuController, private navigation: NavController) { }

  ngOnInit() {
  }

  openMenu(){
    this.menu.open();
  }

  navigateTopUp(){
    this.menu.close();
  }

  navigateHome(){
    this.menu.close();
    this.navigation.navigateForward('agent/home');
  }

  logout(){
    localStorage.clear();
    this.navigation.navigateRoot('login');
  }

}
