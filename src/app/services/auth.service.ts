import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import  firebase from 'firebase/app';
import { User } from '../models/user';
import { RealtimeService } from './realtime.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public Auth: AngularFireAuth, public db: AngularFireDatabase, public realtime: RealtimeService) { }

  signIn(mail: string, password: string) {
    return this.Auth.signInWithEmailAndPassword(mail, password)
  }

  signUp(user: User) {
    return this.Auth.createUserWithEmailAndPassword(user.mail, user.password)
  }

  signOut() {
    return this.Auth.signOut()
  }

  sessionCheck() {
    if (localStorage.getItem("user")) {
      return true
    } else {
      return false
    }
  }




}

