import { Component, OnInit } from '@angular/core';
import {  NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FcmService } from 'src/app/services/fcm.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';

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

  constructor(private router: Router, private api: ApiService, private fcm: FcmService, private localNotifications: LocalNotifications, private platform: Platform, private helper: HelperService) {
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

    this.platform.backButton.subscribe( () =>{
     if(this.helper.active === false){
      let func = () =>{
        this.helper.active = false;
        navigator['app'].exitApp();
      };

      this.helper.presentAlertMessage('Exit PayPak','Do you want to exit?','No','Yes', func);
     }
    });
  }

  changeCarrier(value){
    // this.carrier = value
    this.router.navigate(['agent/recharge',{
      type: value
    }]);
  }

}
