import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  carrier='';

  constructor(private menu: MenuController, private navigation: NavController) { }

  ngOnInit() {
  }

  changeCarrier(value){
    this.carrier = value
  }

  openMenu(){
    this.menu.open();
  }

  navigateTopUp(){
    this.menu.close();
    this.navigation.navigateForward('agent/top-up');
  }

  navigateHome(){
    this.menu.close();
  }

  logout(){
    this.menu.close();
    localStorage.clear();
    this.navigation.navigateRoot('login');
  }

}
