import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController, ModalController, ActionSheetController } from '@ionic/angular';
import { NotificationComponent } from '../shared/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  loading;

  constructor(private toastController: ToastController, private loadingController: LoadingController, private alertController: AlertController, private modal: ModalController, private actionSheetCtrl: ActionSheetController) { }

  async presentActionSheet(title, n1, n2,myfunc,myfunc1){
    const actionSheet = await this.actionSheetCtrl.create({
      header: title,
      buttons: [
        {
          text: n1,
          role: 'destructive',
          cssClass: 'actions-sheet',
          handler: myfunc
        },
        {
          text: n2,
          role: 'destructive',
          cssClass: 'actions-sheet',
          handler: myfunc1
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'action-sheet-cancel',
          handler: () => {

          }
        }
      ]
    });
    await actionSheet.present();
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

  async presentAlertPrompt(func) {
    const alert = await this.alertController.create({
      header: 'Forgot Password',
      message: 'Please provide tell us your e-mail address.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'E-mail Address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Continue',
          handler: func
        }
      ]
    });

    await alert.present();
  }

  Mymodal;

  async presentModal(type,data) {
    this.Mymodal = await this.modal.create({
      component: NotificationComponent,
      componentProps: {
        type: type,
        data: data
       },
      cssClass: 'notificationModal'
    });
  
    return await this.Mymodal.present();
  }

  async presentAlert(header,message, value, btnText, func) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      inputs: [
        {
          name: 'balance',
          type: 'number',
          value: value,
          placeholder: 'New Balance'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: btnText,
          handler: func
        }
      ]
    });

    await alert.present();
  }

  convertDate(x){
    return `${x.getFullYear()}-${(x.getMonth() + 1) < 10 ? ('0' + (x.getMonth() + 1)) : (x.getMonth() + 1)}-${(x.getDate() < 10) ? ('0' + (x.getDate())) : x.getDate()}`;
  }

  converTime(x){
    return `${x.getHours() < 10 ? ('0'+x.getHours() ) : x.getHours()}:${x.getMinutes() < 10 ? ('0' + x.getMinutes()) : x.getMinutes()}`;
  }

}
