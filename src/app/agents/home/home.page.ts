import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  carrier='';

  constructor(private menu: MenuController, private navigation: NavController, private router: Router) { }

  ngOnInit() {
  }

  changeCarrier(value){
    this.carrier = value
    this.router.navigate(['agents/recharge',{
      type: value
    }]);
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
