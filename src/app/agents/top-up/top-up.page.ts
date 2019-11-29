import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.page.html',
  styleUrls: ['./top-up.page.scss'],
})
export class TopUpPage implements OnInit {

  image = 'assets/photo.png';
  uploadImageId;
  sourcex;
  amount=0;
  date;
  number='';
  base64Image='';
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  data;
  userData;

  constructor(private menu: MenuController, private navigation: NavController, private camera: Camera,
    private androidPermissions: AndroidPermissions, private helper: HelperService, private fireStorage: AngularFireStorage, private api: ApiService) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        success => console.log('Permission granted'),
        err => this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE])
      ).catch(err => console.log(err))
     }

  ngOnInit() {
    this.api.getUser(localStorage.getItem('uid'))
      .subscribe(res =>{
        this.userData = res;
      });
  }

  openMenu(){
    this.menu.open();
  }

  navigateTopUp(){
    this.menu.close();
  }

  navigateHome(){
    this.menu.close();
    this.navigation.pop()
      .then(res =>{
        this.navigation.navigateForward('agent/home');
      });
  }

  logout(){
    this.menu.close();
    localStorage.clear();
    this.navigation.navigateRoot('login');
  }

  choosePicture() {
    let myfunc = () => {
        this.takePhoto('library');
    };
    let myfunc1 = () => {
      this.takePhoto('camera');
    };
    this.helper.presentActionSheet('Choose a Picture from.', 'Gallery', 'Camera', myfunc, myfunc1);
    this.uploadImageId = Math.floor(Date.now() / 100);
  }

  takePhoto(source) {
    if (source === 'camera') {
      this.sourcex = this.camera.PictureSourceType.CAMERA;

    } else if (source === 'library') {
      this.sourcex = this.camera.PictureSourceType.PHOTOLIBRARY;

    }

    const options: CameraOptions = {
      sourceType: this.sourcex,
      quality: 70,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {

      this.base64Image = 'data:image/jpeg;base64,' + imageData;

    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  submit(){
    if(this.amount < 20){
      this.helper.presentToast('Minimum Top-Up of AED 20');
      return;
    }
    if(this.base64Image === '' || this.number === '' || this.amount <= 0 || !this.date){
      this.helper.presentToast('Please fill all fields');
      return;
    }
    else{
      this.data = {
        uid: localStorage.getItem('uid'),
        phone: this.number,
        amount: this.amount,
        imageId: '',
        imageURL: '',
        date: this.helper.convertDate(new Date(this.date)),
        time: this.helper.converTime(new Date()),
        name: this.userData.name,
        status: 'pending'
      };
      this.upload();
    }
  }

  upload() {
    this.helper.presentLoading();
    this.uploadImageId = Math.floor(Date.now())
    this.ref = this.fireStorage.ref(`images/${this.uploadImageId}`);
    let task = this.ref.putString(this.base64Image, 'data_url');
    task.snapshotChanges()
      .pipe(finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.data.imageURL = url;
          if (this.data.imageURL !== '') {
            this.data.imageId = this.uploadImageId;
            this.createRequest();
          }
        });
      })).subscribe();
  }

  createRequest(){
    this.api.createTopUpRequest(this.data)
      .then(res =>{
        this.helper.closeLoading();
        this.helper.presentToast('Your Topup Request is sent to Admin.');
        this.navigation.navigateRoot('agent/home');
      }, err =>{
        this.helper.closeLoading();
        this.helper.presentToast(err.message);
      })
  }

  navigateTransaction(){
    this.menu.close();
    this.navigation.pop()
      .then(res =>{
        this.navigation.navigateForward('agent/transactions');
      })
  }

}
