import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  constructor(private menu: MenuController, private navigation: NavController) { }

  ngOnInit() {
  }

  openMenu(){
    this.menu.open();
  }

  navigateTopUp(){
    this.menu.close();
    this.navigation.navigateForward('agent/top-up')
  }

  navigateHome(){
    this.menu.close();
    this.navigation.navigateForward('agent/home');
  }

  navigateTransaction(){
    this.menu.close();
  }

  logout(){
    localStorage.clear();
    this.navigation.navigateRoot('login');
  }

}
