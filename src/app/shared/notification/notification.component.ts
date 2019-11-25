import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {

  @Input() type;
  @Input() data;
  userData;
  loading;

  constructor(private modal: ModalController, private api: ApiService, private navigation: NavController, private toastController: ToastController, private loadingController: LoadingController) { }

  ngOnInit() {
    this.api.getUser(localStorage.getItem('uid'))
      .subscribe(res =>{
        this.userData = res;
      })
  }

  closeModal(){
    this.modal.dismiss();
  }

  recharge(){
    if(this.userData.balance - this.data.amount < 0){
      this.presentToast('You\'ve insufficient amount of balance.');
      this.closeModal();
      return;
    }
    else{
      let data = {
        ...this.data,
        uid: localStorage.getItem('uid'),
        date: new Date()
      };

      this.presentLoading();

      this.api.addNewRechargeRequest(data)
        .then(res =>{
          this.closeModal();
          this.closeLoading();
          this.navigation.navigateRoot('agent/home');
        }, err =>{
          this.presentToast(err.message);
        });
    }
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please Wait...',
      duration: 18000
    });
    await this.loading.present();
  }

  closeLoading() {
    this.loading.dismiss();
  }

}
