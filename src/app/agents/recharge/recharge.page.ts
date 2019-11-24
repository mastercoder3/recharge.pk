import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private menu: MenuController, private navigation: NavController, private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe(res =>{
      if(res.type){
        this.type = res.type;

        this.api.getCarrierSettings(this.type)
          .subscribe( (data:any) =>{
            console.log(data);
            if(data.charge){
              this.charges = data.charge;
            }
          });
      }
    });
  }

  submit(){
    console.log(this.number);
  }

  chargeAmount(amount){
    this.amount = amount;
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

}
