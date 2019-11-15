import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  loading;

  constructor(private toastController: ToastController, private loadingController: LoadingController) { }

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
