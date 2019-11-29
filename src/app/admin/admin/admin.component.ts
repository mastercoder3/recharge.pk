import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor(private menu: MenuController, private navigation: NavController) { }

  ngOnInit() {}

  navigateUpdation(){
    this.menu.close();
    this.navigation.navigateForward('admin/users');
  }

  logout(){
    this.menu.close();
    localStorage.clear();    
    this.navigation.navigateRoot('login');
  }

  navigateHome(){
    this.menu.close();
    this.navigation.navigateForward('admin/home');
  }

  navigateTransaction(){
    this.menu.close();
    this.navigation.navigateForward('admin/transactions');
  }

  navigateSettings(){
    this.menu.close();
    this.navigation.navigateForward('admin/settings');
  }

  navigateProfile(){
    this.menu.close();
    this.navigation.navigateForward('admin/profile');
  }

}
