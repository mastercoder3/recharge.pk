import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private menu: MenuController, private navigation: NavController) { }

  ngOnInit() {
  }

  openMenu(){
    this.menu.open();
  }

  navigateUpdation(){

  }

  logout(){
    this.menu.close();
    localStorage.clear();    
    this.navigation.navigateRoot('');
  }

  navigateHome(){
    this.menu.close();
  }

}
