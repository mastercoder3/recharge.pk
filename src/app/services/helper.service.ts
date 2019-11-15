import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  loading;

  constructor(private toastController: ToastController, private loadingController: LoadingController, private alertController: AlertController) { }

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

}
