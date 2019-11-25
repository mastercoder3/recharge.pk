import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  
  users=[];
  currentUser;

  constructor(private menu: MenuController, private navigation: NavController, private api: ApiService, private helper: HelperService) { }

  ngOnInit() {
    this.api.getAllUsers()
      .pipe(map(actions => actions.map(a =>{
        const data = a.payload.doc.data();
        const did = a.payload.doc.id;
        return {did, ...data};
      })))
      .subscribe( (res:Array<any>) =>{
        this.users = res;
      });
  }

  openMenu(){
    this.menu.open('menu-content01');
  }

  navigateUpdation(){
    this.menu.close('menu-content01');    
  }

  logout(){
    this.menu.close('menu-content01');
    localStorage.clear();    
    this.navigation.navigateRoot('');
  }

  navigateHome(){
    this.menu.close('menu-content01');
    this.navigation.navigateRoot('admin/home');
  }

  changeBalance(item){
    this.currentUser = item;
    let myfunc = (data) =>{
      if(data.balance >= 0){
        this.currentUser.balance = data.balance;
        this.helper.presentLoading();
        this.api.updateUser(this.currentUser.did, this.currentUser)
          .then(res =>{
            this.helper.closeLoading();
            this.helper.presentToast('User Balance Updated');
          }, err =>{
            this.helper.closeLoading();
            this.helper.presentToast(err.message);
          });
      }
      else{
        this.helper.presentToast('Please provide with valid balance.');
      }
    };
    this.helper.presentAlert('Change Balance', 'Change User Balance by Entering new Balance', item.balance, 'Confirm', myfunc );
  }

}
