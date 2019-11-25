import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private afs: AngularFirestore) { }

  createUser(id,data){
    return this.afs.doc('users/'+id).set(data);
  }

  getUser(id){
    return this.afs.doc('users/'+id).valueChanges();
  }

  updateUser(id,data){
    return this.afs.doc('users/'+id).update(data);
  }

  getCarrierSettings(type){
    return this.afs.doc('settings/'+type).valueChanges();
  }

  addNewRechargeRequest(data){
    return this.afs.collection('requests').add(data);
  }

  createTopUpRequest(data){
    return this.afs.collection('topup').add(data);
  }
}
