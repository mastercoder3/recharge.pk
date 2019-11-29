import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  type='';
  settings=[];
  currentData=[];

  constructor(private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    this.api.getAllSettings()
      .pipe(map(actions => actions.map(a =>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe((res: Array<any>) =>{
        this.settings = res;
      });
  }


  typeChanged(){
    this.currentData = this.settings.filter(data => data.did === this.type)[0].charge;
  }

  addNew(){
    let func = (data) =>{
      if(data.amount >= 5){
        this.helper.presentLoading();
        this.currentData.push({
          amount: data.amount,
          text: data.text
        })
        this.api.updateSettingById(this.type,{charge: this.currentData})
          .then(res =>{
            this.helper.closeLoading();
          }, err =>{
            this.helper.closeLoading();
            this.helper.presentToast(err.message);
          })
      }
      else{
        this.helper.presentToast('Minimum amount of 5 is required');
        return;
      }
    };

    this.helper.presentAlertTwoInputs('Add Package','Please provide package details below','','','Add',func);
  }

  moveUp(index) {
    [this.currentData[index - 1], this.currentData[index]] = [this.currentData[index], this.currentData[index - 1]];
    this.api.updateSettingById(this.type,{charge: this.currentData})
  }

  moveDown(index) {
    [this.currentData[index + 1], this.currentData[index]] = [this.currentData[index], this.currentData[index + 1]];
    this.api.updateSettingById(this.type,{charge: this.currentData})
  }

  edit(item,index){
    let func = (data) =>{
      if(data.amount >= 5){
        this.helper.presentLoading();
        this.currentData[index].amount = data.amount;
        this.currentData[index].text = data.text;
        this.api.updateSettingById(this.type,{charge: this.currentData})
          .then(res =>{
            this.helper.closeLoading();
          }, err =>{
            this.helper.closeLoading();
            this.helper.presentToast(err.message);
          })
      }
      else{
        this.helper.presentToast('Minimum amount of 5 is required');
        return;
      }
    };

    let func2 = () =>{
      this.currentData.splice(index,1);
      this.helper.presentLoading();
      this.api.updateSettingById(this.type,{charge: this.currentData})
          .then(res =>{
            this.helper.closeLoading();
          }, err =>{
            this.helper.closeLoading();
            this.helper.presentToast(err.message);
          })
    }

    this.helper.presentAlertTwoInputs('Add Package','Please provide package details below',item.amount,item.text,'Update',func, true, 'Delete', func2);
  }

}
