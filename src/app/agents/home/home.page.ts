import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FcmService } from 'src/app/services/fcm.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

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

  constructor(private menu: MenuController, private navigation: NavController, private router: Router, private api: ApiService, private fcm: FcmService, private localNotifications: LocalNotifications) {
    this.fcm.getToken(localStorage.getItem('uid'));

    this.fcm.listenToNotifications().pipe(
      tap((msg) =>{
          this.localNotifications.schedule({
            title: msg.title,
            text: msg.body
          });
        
      })
    ).subscribe();
   }

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
    this.menu.open('menu-content11');
  }

  navigateTopUp(){
    this.menu.close('menu-content11');
    this.navigation.navigateForward('agent/top-up');
  }

  navigateHome(){
    this.menu.close('menu-content11');
  }

  navigateTransaction(){
    this.menu.close('menu-content11');
    this.navigation.navigateForward('agent/transactions');
  }

  logout(){
    this.menu.close('menu-content11');
    localStorage.clear();
    this.navigation.navigateRoot('login');
  }

}
