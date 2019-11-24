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

  getCarrierSettings(type){
    return this.afs.doc('settings/'+type).valueChanges();
  }
}
