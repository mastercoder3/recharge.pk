import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private helper: HelperService, private auth: AuthService, private api: ApiService, private navigation: NavController) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      repeatPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      name: ['', Validators.required],
      phone: ['', Validators.compose([Validators.minLength(10), Validators.required])]
    });
  }

  submit(form){
    if(form.value.password === form.value.repeatPassword){
      this.helper.presentLoading();
      this.auth.signup(form.value.email, form.value.password)
        .then( res =>{
          this.api.createUser(res.user.uid, {email: form.value.email, password: form.value.password, type: 'agent', name: form.value.name, phone: form.value.phone, balance: 0})
            .then(created =>{
              localStorage.setItem('uid',res.user.uid);
              this.helper.closeLoading();
              this.helper.presentToast('User created');
              this.navigation.navigateRoot('login');
            }, err =>{
              this.helper.closeLoading();
              this.helper.presentToast(err.message);
            });
        }, err =>{
          this.helper.closeLoading();
          this.helper.presentToast(err.message);
        });
    }
    else{
      this.helper.presentToast('Password doesn\'t match.');
    }
  }

}
