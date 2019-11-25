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

  getAllRechargeRequestsById(id){
    return this.afs.collection('requests', ref => ref.where('uid','==',id)).snapshotChanges();
  }

  getAllPendingRechargeRequests(){
    return this.afs.collection('requests', ref => ref.where('status','==','pending')).snapshotChanges();    
  }

  updateRequestById(id,data){
    return this.afs.doc('requests/'+id).update(data);
  }

  createTopUpRequest(data){
    return this.afs.collection('topup').add(data);
  }

  getAllTopUpRequestsById(id){
    return this.afs.collection('topup', ref => ref.where('uid','==',id)).snapshotChanges();
  }

  getAllPendingTopUpRequests(){
    return this.afs.collection('topup', ref => ref.where('status','==','pending')).snapshotChanges();
  }

  updateTopupRequest(id,data){
    return this.afs.doc('topup/'+id).update(data);
  }
}
