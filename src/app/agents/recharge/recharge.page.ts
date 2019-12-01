import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.page.html',
  styleUrls: ['./recharge.page.scss'],
})
export class RechargePage implements OnInit {

  type='';
  charges=[];
  amount=0;
  number='';
  userData; 
  text='';
  rate=0;

  constructor(private menu: MenuController, private navigation: NavController, private route: ActivatedRoute, private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    this.route.params.subscribe(res =>{
      if(res.type){
        this.type = res.type;

        this.api.getCarrierSettings(this.type)
          .subscribe( (data:any) =>{
            // console.log(data);
            if(data.charge){
              this.charges = data.charge;
            }
          });
      }
    });

    this.api.getUser(localStorage.getItem('uid'))
      .subscribe(res =>{
        this.userData = res;
      });

    this.api.getCarrierSettings('rate')
      .subscribe( (res:any) =>{
        if(res.conversion){
          this.rate = res.conversion;
        }
      });
  }

  submit(){
    console.log(this.number);
    if(this.number.length < 9){
      this.helper.presentToast('Please provide a valid phone number.');
      return;
    }
    else if(this.amount < 5){
      this.helper.presentToast('Minimum Amount is 5 AED');
      return;
    }
    else{
      this.helper.presentModal('load',{amount: this.amount, number: `03${this.number}`, type: this.type, text: this.text !== '' ? this.text : `PKR. ${this.amount * this.rate}`});
    }
  }

  chargeAmount(item){
    this.amount = item.amount;
    this.text = item.text;
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
    this.navigation.navigateRoot('agent/home');
  }

  logout(){
    this.menu.close();
    localStorage.clear();
    this.navigation.navigateRoot('login');
  }

  navigateTransaction(){
    this.menu.close();
    this.navigation.navigateForward('agent/transactions');
  }

}
