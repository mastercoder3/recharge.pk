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
    this.start = this.helper.convertDate(new Date(x.setDate(x.getDate() - 3)));
    this.end = this.helper.convertDate(new Date());

    this.api.getUser(localStorage.getItem('uid'))
      .subscribe(res =>{
        this.userData = res;
    });

    this.api.getAllTopUpRequestsById(localStorage.getItem('uid'))
      .pipe(map(actions => actions.map(a =>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe( (res: Array<any> ) =>{
        this.topups = res;
        this.searchTopups = this.topups.filter(data => data.date >= this.helper.convertDate(new Date(this.start)) && data.date <= this.helper.convertDate(new Date(this.end)));
      });

    this.api.getAllRechargeRequestsById(localStorage.getItem('uid'))
      .pipe(map(actions => actions.map(a =>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe( (res: Array<any> ) =>{
        this.rechrage = res;
        this.searchRecharge = this.rechrage.filter(data => data.date >= this.helper.convertDate(new Date(this.start)) && data.date <= this.helper.convertDate(new Date(this.end)))
      });
  }

  search(){
    if(this.helper.convertDate(new Date(this.start)) > this.helper.convertDate(new Date(this.end))){
      this.helper.presentToast('Please choose a valid date');
      return;
    }
    else{
      this.searchTopups = this.topups.filter(data => data.date >= this.helper.convertDate(new Date(this.start)) && data.date <= this.helper.convertDate(new Date(this.end)));
      this.searchRecharge = this.rechrage.filter(data => data.date >= this.helper.convertDate(new Date(this.start)) && data.date <= this.helper.convertDate(new Date(this.end)))
    }
  }


  changeTab(val){
    this.currentTab = val;
  }

}
