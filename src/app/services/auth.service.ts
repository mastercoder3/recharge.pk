import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  login(email,password){
    return this.afAuth.auth.signInWithEmailAndPassword(email,password);
  }

  signup(email,password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email,password);
  }

  enablePersistence(){
    return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  resetPassword(email){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
  
}
