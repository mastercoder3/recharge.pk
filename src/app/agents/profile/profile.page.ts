import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData={
    name: '',
    phone: ''
  };
  password='';
  confirmPassword='';

  constructor(private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    this.api.getUser(localStorage.getItem('uid'))
      .subscribe((res: any) =>{
        this.userData = res;
      })
  }

  submit(){
    if(this.userData.name !== '' && this.userData.phone !== ''){
      this.helper.presentLoading();
      this.api.updateUser(localStorage.getItem('uid'),this.userData)
        .then(res =>{
          this.helper.closeLoading();
          this.helper.presentToast('Profile Updated');
        }, err =>{
          this.helper.closeLoading();
          this.helper.presentToast(err.message);
        });
    }
  }

  changePassword(){
    if(this.password !== this.confirmPassword){
      this.helper.presentToast('Password doesn\'t matches. Please try again.');
      return;
    }
    if(this.password.length > 6){
      this.helper.presentLoading();
      firebase.auth().onAuthStateChanged( user => {
        if(user){
         user.updatePassword(this.password)
          .then(res =>{
            this.helper.presentToast('Your Password Has been Changed.');
            this.password = '';
            this.helper.closeLoading()
          }, err =>{
            this.helper.closeLoading();
            this.helper.presentToast(err.message);
          })
        }
        else{
          this.helper.presentToast('Cannot Change passowrd Right now, come back later.');
        }
        
      });
    }
    else{
      this.helper.presentToast('Password too short.');
    }
  }

}
