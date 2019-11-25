import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  carrier='';
  userData = {
    balance: 0,
    name: '',
    phone: ''
  };

  constructor(private menu: MenuController, private navigation: NavController, private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.api.getUser(localStorage.getItem('uid'))
      .subscribe((res:any) =>{
        this.userData = res;
      });
  }

  changeCarrier(value){
    // this.carrier = value
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
