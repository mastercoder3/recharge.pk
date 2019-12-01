import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  walletText='';
  rate=0;

  constructor(private menu: MenuController, private navigation: NavController, private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    this.api.getCarrierSettings('info')
      .subscribe( (res:any) =>{
        if(res.text){
          this.walletText = res.text;
        }
      });

    this.api.getCarrierSettings('rate')
    .subscribe( (res:any) =>{
      if(res.conversion){
        this.rate = res.conversion;
      }
    });

  }

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

  navigateAccountInfo(){
    this.menu.close();

    let func = (data) =>{
      if(data.info){
        this.walletText = data.info;
        this.api.updateSettingById('info',{text: this.walletText});
      }
    };

    this.helper.presentAlertOneInput('Account Info','Update your Account Information for Top-Up.','text','Your Account Info', this.walletText,'Update',func);
  }

  navigateConversionRate(){
    this.menu.close();

    let func = (data) =>{
      if(data.info){
        this.rate = data.info;
        this.api.updateSettingById('rate',{conversion: this.rate});
      }
    };

    this.helper.presentAlertOneInput('Conversion Rate','Update your Conversion Rate from AED to PKR.','number','New Rate in PKR', this.rate,'Update',func);
  }

}
