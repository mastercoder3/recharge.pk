import { Component, OnInit } from '@angular/core';
import {  NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {

  userData;
  start;
  end;
  topups=[];
  rechrage=[];
  currentTab='top';
  searchTopups=[];
  searchRecharge=[];

  constructor( private navigation: NavController, private api: ApiService, private helper: HelperService) { }

  ngOnInit() {

    let x = new Date();
    this.start = this.helper.convertDate(new Date(x.setDate(x.getDate() - 30)));
    this.end = this.helper.convertDate(new Date());

    this.api.getAllTopUpRequests()
      .pipe(map(actions => actions.map(a =>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe( (res: Array<any> ) =>{
        this.topups = res;
        this.searchTopups = this.topups.filter(data => data.date >= this.helper.convertDate(new Date(this.start)) && data.date <= this.helper.convertDate(new Date(this.end)));
        this.searchTopups.map(a => {return {temp: a.date+'-'+a.time, ...a}}).sort((a,b):any => {
          if(a.temp < b.temp){
            return -1;
          }
          else{
            return 1;
        }
        });
      });

    this.api.getAllRechargeRequests()
      .pipe(map(actions => actions.map(a =>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe( (res: Array<any> ) =>{
        this.rechrage = res.filter(data => data.status !== 'rejected');
        this.searchRecharge = this.rechrage.filter(data => data.date >= this.helper.convertDate(new Date(this.start)) && data.date <= this.helper.convertDate(new Date(this.end)));
        this.searchRecharge = this.searchRecharge.map(a => {return {temp: a.date+'-'+a.time, ...a}}).sort((a,b):any => {
          if(a.temp < b.temp){
            return -1;
          }
          else{
            return 1;
        }
        });
      });
  }

  search(){
    if(this.helper.convertDate(new Date(this.start)) > this.helper.convertDate(new Date(this.end))){
      this.helper.presentToast('Please choose a valid date');
      return;
    }
    else{
      this.searchTopups = this.topups.filter(data => data.date >= this.helper.convertDate(new Date(this.start)) && data.date <= this.helper.convertDate(new Date(this.end)));
      this.searchTopups.sort((a,b):any => {
        if(a.temp < b.temp){
          return -1;
        }
        else{
          return 1;
      }
      });
      this.searchRecharge = this.rechrage.filter(data => data.date >= this.helper.convertDate(new Date(this.start)) && data.date <= this.helper.convertDate(new Date(this.end)));
      this.searchRecharge = this.searchRecharge.map(a => {return {temp: a.date+'-'+a.time, ...a}}).sort((a,b):any => {
          if(a.temp < b.temp){
            return -1;
          }
          else if(a.temp > b.temp){
            return 1;
          }
        });
    }
  }


  changeTab(val){
    this.currentTab = val;
  }

}
