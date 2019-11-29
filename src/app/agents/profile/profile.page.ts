import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HelperService } from 'src/app/services/helper.service';

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
    
  }

}
