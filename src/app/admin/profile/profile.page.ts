import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  password='';
  confirmPassword='';

  constructor(private api: ApiService, private helper: HelperService, private auth: AngularFireAuth) { }

  ngOnInit() {
  }

  changePassword(){
    if(this.password !== this.confirmPassword){
      this.helper.presentToast('Password doesn\'t matches. Please try again.');
      return;
    }
    if(this.password.length >= 6){
      this.helper.presentLoading();
      const afAuth = this.auth.auth;
      const user = afAuth.currentUser;
      if(user.uid){
        user.updatePassword(this.password)
          .then(res =>{
            this.helper.closeLoading();
            this.helper.presentToast('Password Changed.');
          }, err =>{
            this.helper.closeLoading();
            this.helper.presentToast(err.message);
          })
      }
      else{
        this.helper.closeLoading();
        this.helper.presentToast('Cannot Change passowrd Right now, come back later.');
      }
    }
    else{
      this.helper.presentToast('Password too short.');
    }
  }

}
