import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  userData;

  constructor(private fb: FormBuilder, private navigation: NavController, private auth: AuthService, private helper: HelperService, private api: ApiService, private platform: Platform) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
    
    this.platform.backButton.subscribe( () =>{
      if(this.helper.active === false){
       let func = () =>{
         this.helper.active = false;
         navigator['app'].exitApp();
       };
 
       this.helper.presentAlertMessage('Exit PayPak','Do you want to exit?','No','Yes', func);
      }
     });
  }

  navigateRegister(){
    this.navigation.navigateForward('register');
  }

  submit(form){
    this.helper.presentLoading();
    this.auth.login(form.value.email, form.value.password)
      .then( res =>{
        this.auth.enablePersistence();
        this.api.getUser(res.user.uid)
          .subscribe ((data:any) =>{
            this.userData = data;
            if(this.userData.type === 'agent'){
              this.helper.closeLoading();
              localStorage.setItem('uid',res.user.uid);
              localStorage.setItem('type',this.userData.type)
              this.navigation.navigateRoot('agent/home');
            }
            else if(this.userData.type === 'admin'){
              this.helper.closeLoading();
              localStorage.setItem('uid',res.user.uid);
              localStorage.setItem('type',this.userData.type)
              this.navigation.navigateRoot('admin/home');
            }
          });
      }, err =>{
        this.helper.closeLoading();
        this.helper.presentToast(err.message);
      });
  }

  forgotPassword(){
    let func = (data) =>{
      this.helper.presentLoading().then( run =>{
        this.auth.resetPassword(data.email)
        .then(res =>{
          this.helper.closeLoading();
          this.helper.presentToast('Please check your inbox for Password reset Email.');
        }, err =>{
          this.helper.closeLoading();
          this.helper.presentToast(err.message);
        });
      });
    };

    this.helper.presentAlertPrompt(func);
  }

}
