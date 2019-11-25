import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';
import { FcmService } from 'src/app/services/fcm.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  currentTab='top';  
  topups=[];
  rechrage=[];

  constructor(private menu: MenuController, private navigation: NavController, private api: ApiService, private helper: HelperService, private fcm: FcmService, private localNotifications: LocalNotifications) { 
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
    this.api.getAllPendingTopUpRequests()
    .pipe(map(actions => actions.map(a =>{
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data};
    })))
    .subscribe( (res: Array<any> ) =>{
      this.topups = res;
    });

  this.api.getAllPendingRechargeRequests()
    .pipe(map(actions => actions.map(a =>{
      const data = a.payload.doc.data();
      const did = a.payload.doc.id;
      return {did, ...data};
    })))
    .subscribe( (res: Array<any> ) =>{
      this.rechrage = res;
    });
  }

  openTopUp(item){
    this.helper.presentModal('top',item);
  }

  charge(item){
    this.helper.presentModal('bal',item);    
  }

  openMenu(){
    this.menu.open('menu-content00');
  }

  navigateUpdation(){
    this.menu.close('menu-content00');
    this.navigation.navigateForward('admin/users');
  }

  logout(){
    this.menu.close('menu-content00');
    localStorage.clear();    
    this.navigation.navigateRoot('login');
  }

  navigateHome(){
    this.menu.close('menu-content00');
  }

  changeTab(val){
    this.currentTab = val;
  }

}
