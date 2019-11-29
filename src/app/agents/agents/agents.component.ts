import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
})
export class AgentsComponent implements OnInit {

  userData;

  constructor(private menu: MenuController, private navigation: NavController, private api: ApiService) { }

  ngOnInit() {
    this.api.getUser(localStorage.getItem('uid'))
      .subscribe(res =>{
        this.userData = res;
      });
  }

  navigateProfile(){
    this.menu.close();
    this.navigation.navigateForward('agent/profile');
  }

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
