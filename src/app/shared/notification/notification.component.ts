import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';

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

  constructor(private modal: ModalController, private api: ApiService, private navigation: NavController, private toastController: ToastController, private loadingController: LoadingController,
    private clipboard: Clipboard, private newModal: ModalController) { }

  ngOnInit() {
    if(this.type === 'load'){
      this.api.getUser(localStorage.getItem('uid'))
        .subscribe(res =>{
          this.userData = res;
      });
    }
    else if(this.type !== 'load'){
      this.api.getUser(this.data.uid)
      .subscribe(res =>{
        this.userData = res;
      });
    }
  }

  copyToClipboard(number){
    this.clipboard.copy(number.toString());
    this.presentToast('Number copy to the clipboard.');
  }

  confirmRecharge(){
    let commissionAmount = (2.5 * this.data.amount) / 100;
    this.userData.balance = this.userData.balance + commissionAmount;
    this.data.status = 'completed';
    this.presentLoading();
    this.api.updateRequestById(this.data.did, this.data)
      .then(res =>{
        this.api.createTopUpRequest({
          amount: commissionAmount,
          uid: this.data.uid,
          status: 'added',
          date: this.convertDate(new Date),
          time: this.converTime(new Date()),
          name: this.data.name,
          phone: this.data.phone,
          type: 'Commission',
        });
        this.api.updateUser(this.data.uid, this.userData)
          .then(done =>{
            this.closeLoading();
            this.closeModal();
            this.presentToast('Your e-Load is Successfully sent.');
          } , err =>{
            this.closeLoading();
            this.presentToast(err.message);
          })
      }, err =>{
        this.closeLoading();
        this.presentToast(err.message);
      });
  }

  rejectRecharge(){
    this.userData.balance += this.data.amount;
    this.data.status = 'rejected';
    this.presentLoading();
    this.api.updateRequestById(this.data.did, this.data)
      .then(res =>{
        this.api.updateUser(this.data.uid, this.userData)
          .then(done =>{
            this.closeLoading();
            this.closeModal();
          } , err =>{
            this.closeLoading();
            this.presentToast(err.message);
          })
      }, err =>{
        this.closeLoading();
        this.presentToast(err.message);
      });
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
        date: this.convertDate(new Date()),
        time: this.converTime(new Date()),
        status: 'pending',
        name: this.userData.name,
        phone: this.userData.phone
      };

      this.presentLoading();

      this.api.addNewRechargeRequest(data)
        .then(res =>{
          this.userData.balance = this.userData.balance - this.data.amount;
          this.api.updateUser(localStorage.getItem('uid'),this.userData);
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

  convertDate(x){
    return `${x.getFullYear()}-${(x.getMonth() + 1) < 10 ? ('0' + (x.getMonth() + 1)) : (x.getMonth() + 1)}-${(x.getDate() < 10) ? ('0' + (x.getDate())) : x.getDate()}`;
  }

  converTime(x){
    return `${x.getHours() < 10 ? ('0'+x.getHours() ) : x.getHours()}:${x.getMinutes() < 10 ? ('0' + x.getMinutes()) : x.getMinutes()}`;
  }

  openImage(){
    this.presentModal(this.data.imageURL);
  }

  Mymodal;

  async presentModal(images) {
    this.Mymodal = await this.newModal.create({
      component: ImageViewerComponent,
      componentProps: {
        images: [images]
       },
      cssClass: 'imageModal'
    });
  
    return await this.Mymodal.present();
  }

  confirmTopUp(){
    this.userData.balance += this.data.amount;
    this.data.status = 'completed';
    this.presentLoading();
    this.api.updateTopupRequest(this.data.did, this.data)
      .then(res =>{
        this.api.updateUser(this.data.uid, this.userData)
          .then(done =>{
            this.closeLoading();
            this.closeModal();
          } , err =>{
            this.closeLoading();
            this.presentToast(err.message);
          })
      }, err =>{
        this.closeLoading();
        this.presentToast(err.message);
      });
  }

}
